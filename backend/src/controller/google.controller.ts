import asyncHandler from "../middleware/asyncHandler";
import { google } from "googleapis";
import fs from "fs";
import dotenv from "dotenv";
import googleDriveInstance from "../utils/googleapi.instance";
import logger from "../utils/logger";
import userModel from "../model/user.model";
dotenv.config();

const fileTypeRiskScores = {
  ".exe": 5,
  ".bat": 5,
  ".sh": 5,
  ".py": 4,
  ".js": 4,
  ".php": 4,
  ".zip": 3,
  ".rar": 3,
  ".7z": 3,
  ".pdf": 2,
  ".docx": 2,
  ".xlsx": 2,
  ".jpg": 1,
  ".png": 1,
  ".gif": 1,
};
const fileSizeThreshold = 10 * 1024 * 1024;
const sharedFileRiskIncrement = 2;

const moderateRiskThreshold = 4;

const lowRiskThreshold = 2;
const maxSharingRiskThreshold = 10;

export const authGoogle = asyncHandler(async (req, res) => {
  const emailId = req.params.emailId;

  let userDetails = await userModel.findOne({ email: emailId });
  if (!userDetails) {
    logger.error("User not found");
    userDetails = await userModel.create({ email: emailId });
  }
  const url = googleDriveInstance.generateAuthUrl({
    access_type: "offline",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/drive",
      "https://www.googleapis.com/auth/drive.file",
      "https://www.googleapis.com/auth/drive.metadata",
      "https://www.googleapis.com/auth/drive.metadata.readonly",
    ],
    prompt: "consent",
    state: userDetails._id.toString(),
  });

  res.json({ url, state: userDetails._id.toString() });
});

export const redirectGoogle = asyncHandler(async (req, res) => {
  const code = req.query.code;
  const state = req.query.state;
  const _id = state;

  const { tokens } = await googleDriveInstance.getToken(code as string);
  const userDetails = await userModel.findById(_id);
  if (!userDetails) {
    logger.error("User not found");
    return res.status(404).json({ message: "User not found" });
  }
  const userUpdate = await userModel.findByIdAndUpdate(_id, {
    access_token: tokens.access_token,
    refresh_token: tokens.refresh_token,
    expiry_date: tokens.expiry_date,
    token_type: tokens.token_type,
    scope: tokens.scope,
    id_token: tokens.id_token,
  });
  res.redirect(`${process.env.FE_URI}report`);
});

export const driveMetadata = asyncHandler(async (req, res) => {
  const accesstoken = JSON.parse(fs.readFileSync("./tokens.json", "utf8"));
  const drive = google.drive({ version: "v3", auth: googleDriveInstance });
  googleDriveInstance.setCredentials(accesstoken);
  const metadata = await drive.files.list({
    fields:
      "nextPageToken, files(id, name, modifiedTime, owners, permissions, webContentLink, webViewLink)",
  });
  res.send(metadata);
});

export const driveList = asyncHandler(async (req, res) => {
  const accesstoken = JSON.parse(fs.readFileSync("./tokens.json", "utf8"));
  const drive = google.drive({ version: "v3", auth: googleDriveInstance });
  googleDriveInstance.setCredentials(accesstoken);
  const metadata = await drive.files.list({
    fields:
      "nextPageToken, files(id, name, modifiedTime, owners, permissions, webContentLink, webViewLink)",
  });
  res.send(metadata);
});

export const anayticsOfGoogleDrive = asyncHandler(async (req, res) => {
  const _id = req.query.id;
  if (!_id) return res.status(400).json({ message: "User id not found" });

  const userDetails = await userModel.findOne({ _id });
  if (!userDetails) {
    logger.error("User not found");
    return res.status(404).json({ message: "User not found" });
  }

  const accesstoken = {
    access_token: userDetails?.access_token,
    refresh_token: userDetails?.refresh_token,
    expiry_date: userDetails?.expiry_date,
    token_type: userDetails?.token_type,
    scope: userDetails?.scope ?? undefined,
    id_token: userDetails?.id_token,
  };

  const drive = google.drive({ version: "v3", auth: googleDriveInstance });
  googleDriveInstance.setCredentials(accesstoken);

  const response = await drive.files.list({
    fields:
      "nextPageToken, files(id, name, modifiedTime, owners, permissions, webContentLink, webViewLink)",
  });

  const files = response.data.files;
  let totalRiskScore = 0;
  const fileAnalytics: any[] = [];
  let highRiskCount = 0;
  let moderateRiskCount = 0;
  let lowRiskCount = 0;
  let externalShareCount = 0;
  if (!files || files.length === 0) {
    throw new Error("No files found");
  }

  // Regex pattern to detect potential secrets or passwords in file names
  const secretPatternRegex = /password|secret|key|token/i;

  files.forEach((file) => {
    if (file === null) {
      return;
    }

    const fileExtension = file?.name?.split(".")?.pop()?.toLowerCase();
    //@ts-ignore
    let fileRiskScore = fileTypeRiskScores[`.${fileExtension}`] || 2;

    // Factor in file size
    //@ts-ignore
    if (file.size > fileSizeThreshold) {
      fileRiskScore += 1;
    }

    // Factor in sharing settings
    const permissionCount = file?.permissions?.length;
    const sharingRiskScore = permissionCount
      ? permissionCount > maxSharingRiskThreshold
        ? sharedFileRiskIncrement
        : 0
      : 0;
    fileRiskScore += sharingRiskScore;

    const isPubliclyAccessible = file?.permissions?.some(
      (permission) => permission.type === "anyone"
    );
    if (isPubliclyAccessible) {
      fileRiskScore = 3;
    }

    // @ts-ignore
    const isExternallyShared = file?.permissions?.some(
      (permission) =>
        permission.type === "user" &&
        permission?.emailAddress?.indexOf("@example.com") === -1
    );
    if (isExternallyShared) {
      externalShareCount++;
    }

    // Check if file name matches secret pattern
    //@ts-ignore
    const matchesSecretPattern = secretPatternRegex.test(file.name);
    if (matchesSecretPattern) {
      fileRiskScore = 5;
    }

    totalRiskScore += fileRiskScore;

    // Categorize risk level
    if (fileRiskScore >= moderateRiskThreshold) {
      highRiskCount++;
    } else if (fileRiskScore > lowRiskThreshold) {
      moderateRiskCount++;
    } else {
      lowRiskCount++;
    }

    fileAnalytics.push({
      name: file.name,
      mimeType: file.mimeType,
      size: file.size,
      webViewLink: file.webViewLink,
      riskScore: fileRiskScore,
      permissionCount,
      isPubliclyAccessible,
      matchesSecretPattern,
    });
  });

  const totalFiles = files.length;
  const overallRiskPercentage = (totalRiskScore / (totalFiles * 5)) * 100; // Assuming max risk score is 5

  const analytics = {
    totalRiskScore,
    overallRiskPercentage,
    highRiskCount,
    moderateRiskCount,
    lowRiskCount,
    fileAnalytics,
    files,
    totalFiles,
    externalShareCount,
  };

  res.json(analytics);
});

export const revokeGoogle = asyncHandler(async (req, res) => {
  const _id = req.query.id;
  if (!_id) return res.status(400).json({ message: "User id not found" });

  const userDetails = await userModel.findById(_id);
  if (!userDetails) {
    logger.error("User not found");
    return res.status(404).json({ message: "User not found" });
  }
  const accesstoken = {
    access_token: userDetails?.access_token,
    refresh_token: userDetails?.refresh_token,
    expiry_date: userDetails?.expiry_date,
    token_type: userDetails?.token_type,
    scope: userDetails?.scope ?? undefined,
    id_token: userDetails?.id_token,
  };
  googleDriveInstance.setCredentials(accesstoken);

  if (
    Object.values(accesstoken).every(
      (value) => value === null || value === undefined
    )
  ) {
    return res.status(400).json({ message: "Access token not found" });
  }
  const response = googleDriveInstance.revokeToken(
    accesstoken.access_token as string
  );
  res.json(response);
});

import asyncHandler from "../middleware/asyncHandler";
import { google } from "googleapis";
import fs from "fs";
import dotenv from "dotenv";
import googleDriveInstance, { scope } from "../utils/googleapi.instance";
import logger from "../utils/logger";
import userModel from "../model/user.model";
import mongoose from "mongoose";
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
  logger.info(req.state);
  const state = req.query.state;
  const _id = state;
  logger.info(_id);

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
  anayticsOfGoogleDrive(req, res);

  // res.send(tokens);
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
  logger.info(_id);
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

  //@ts-ignore next-line
  const fileAnalytics: any[] = [];
  let highRiskCount = 0;
  let moderateRiskCount = 0;
  let lowRiskCount = 0;
  if (!files || files.length === 0) {
    throw new Error("No files found");
  }

  files.forEach((file) => {
    if (file === null) {
      return;
    }
    //@ts-ignore next-line
    const fileExtension = file?.name?.split(".")?.pop()?.toLowerCase();
    //@ts-ignore next-line
    let fileRiskScore = fileTypeRiskScores[`.${fileExtension}`] || 2; // Default to moderate risk

    // Factor in file size
    //@ts-ignore next-line
    if (file.size > fileSizeThreshold) {
      fileRiskScore += 1;
    }
    console.log(file);
    // Factor in sharing settings
    const permissionCount = file?.permissions?.length;
    //@ts-ignore next-line
    const sharingRiskScore =
      //@ts-ignore next-line
      permissionCount > maxSharingRiskThreshold ? sharedFileRiskIncrement : 0;
    fileRiskScore += sharingRiskScore;
    //@ts-ignore
    const isPubliclyAccessible = file?.permissions?.some(
      (permission) => permission.type === "anyone"
    );
    if (isPubliclyAccessible) {
      fileRiskScore = 5; // Assign highest risk score
    }

    totalRiskScore += fileRiskScore;

    totalRiskScore += fileRiskScore;

    // Categorize risk level
    //@ts-ignore next-line
    if (fileRiskScore >= moderateRiskThreshold) {
      highRiskCount++;
      //@ts-ignore next-line
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
  };

  res.json(analytics);
});

export const revokeGoogle = asyncHandler(async (req, res) => {
  const accesstoken = JSON.parse(fs.readFileSync("./tokens.json", "utf8"));
  // revokeGoogle accesstoken and all the permissions associated with it
  googleDriveInstance.revokeToken(accesstoken.access_token);
  // googleDriveInstance.
});

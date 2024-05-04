import asyncHandler from "../middleware/asyncHandler";
import { google } from "googleapis";
import fs from "fs";
import dotenv from "dotenv";
import googleDriveInstance from "../utils/googleapi.instance";
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
const fileSizeThreshold = 10 * 1024 * 1024; // 10 MB

const sharedFileRiskIncrement = 2;

const moderateRiskThreshold = 4;

const lowRiskThreshold = 2;
const maxSharingRiskThreshold = 10;

export const authGoogle = asyncHandler(async (req, res) => {
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
  });
  res.redirect(url);
});

export const redirectGoogle = asyncHandler(async (req, res) => {
  const code = req.query.code;
  const { tokens } = await googleDriveInstance.getToken(code as string);
  fs.writeFileSync("./tokens.json", JSON.stringify(tokens));
  res.send(tokens);
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
  const accesstoken = JSON.parse(fs.readFileSync("./tokens.json", "utf8"));
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
      (permission) => permission.type === "anyone",
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

  // const accesstoken = JSON.parse(fs.readFileSync("./tokens.json", "utf8"));
  // const drive = google.drive({ version: "v3", auth: googleDriveInstance });
  // googleDriveInstance.setCredentials(accesstoken);
  // const metadata = await drive.files.list({
  //   fields:
  //     "nextPageToken, files(id, name, modifiedTime, owners, permissions, webContentLink, webViewLink)",
  // });
  // if (!metadata || !metadata.data || !metadata.data.files) {
  //   throw new Error("No metadata found");
  // }
  // const files = metadata.data.files;
  // let totalRiskScore = 0;
  // const fileAnalytics: any[] = [];
  //
  // files.forEach((file) => {
  //   if (file === null) {
  //     return;
  //   }
  //   //@ts-ignore next-line
  //   const fileExtension = file.name.split(".").pop().toLowerCase();
  //   //@ts-ignore next-line
  //   let fileRiskScore = fileTypeRiskScores[`.${fileExtension}`] || 2;
  //
  //   if (
  //     file.size !== null &&
  //     file.size !== undefined &&
  //     +file.size > fileSizeThreshold
  //   ) {
  //     fileRiskScore += 1;
  //   }
  //
  //   //@ts-ignore next-line
  //   const permissionCount = file?.permissions?.length || 0;
  //   const sharingRiskScore =
  //     permissionCount > maxSharingRiskThreshold ? sharedFileRiskIncrement : 0;
  //   fileRiskScore += sharingRiskScore;
  //
  //   totalRiskScore += fileRiskScore;
  //
  //   fileAnalytics.push({
  //     name: file.name,
  //     mimeType: file.mimeType,
  //     size: file.size,
  //     webViewLink: file.webViewLink,
  //     riskScore: fileRiskScore,
  //     permissionCount,
  //   });
  // });
  //
  // const analytics = {
  //   totalRiskScore,
  //   fileAnalytics,
  // };
  //
  // res.send(analytics);
});

export const revokeGoogle = asyncHandler(async (req, res) => {
  const accesstoken = JSON.parse(fs.readFileSync("./tokens.json", "utf8"));
  // revokeGoogle accesstoken and all the permissions associated with it
  googleDriveInstance.revokeToken(accesstoken.access_token);
  // googleDriveInstance.
});

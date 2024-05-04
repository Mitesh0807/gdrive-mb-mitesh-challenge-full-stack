import express from "express";
import cors from "cors";
// import bodyParser from 'body-parser';
import { google } from "googleapis";
import fs from "fs";
import dotenv from "dotenv";
import connectDB from "./db/connection";
import logger from "./utils/logger";
dotenv.config();

(async () => {
  const conn = await connectDB();
})();

const app = express();
const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);
app.get("/google/auth", (req, res) => {
  const url = oauth2Client.generateAuthUrl({
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

app.get("/google/redirect", async (req, res) => {
  const code = req.query.code;

  const { tokens } = await oauth2Client.getToken(code as string);
  fs.writeFileSync("./tokens.json", JSON.stringify(tokens));

  console.log(tokens);

  res.send(tokens);
});

app.get("/google/drive/metadata", async (req, res) => {
  const accesstoken = JSON.parse(fs.readFileSync("./tokens.json", "utf8"));
  const drive = google.drive({ version: "v3", auth: oauth2Client });

  oauth2Client.setCredentials(accesstoken);

  // let`s get all files metadata from google drive fileds for file type , id , name , who modified , who have access , access link , public link
  //      "nextPageToken, files('id','name','modifiedTime','owners','permissions','webContentLink','webViewLink')",
  const metadata = await drive.files.list({
    fields:
      "nextPageToken, files(id, name, modifiedTime, owners, permissions, webContentLink, webViewLink)",
  });
  res.send(metadata);
});

app.listen(process.env.PORT || 8000, () => {
  logger.info(`Server started on port ${process.env.PORT || 8000}`);
});

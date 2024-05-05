import express from "express";
import {
  authGoogle,
  anayticsOfGoogleDrive,
  redirectGoogle,
} from "../controller/google.controller";
const router = express.Router();
router.get("/google/auth", authGoogle);
router.get("/google/redirect", redirectGoogle);
router.get("/google/drive/metadata", anayticsOfGoogleDrive);

export default router;
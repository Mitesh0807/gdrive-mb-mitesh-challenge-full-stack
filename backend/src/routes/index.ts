import express from "express";
import {
  authGoogle,
  anayticsOfGoogleDrive,
  redirectGoogle,
  revokeGoogle,
} from "../controller/google.controller";
const router = express.Router();
router.get("/google/auth:emailId", authGoogle);
router.get("/google/redirect", redirectGoogle);
router.get("/google/drive/metadata", anayticsOfGoogleDrive);
router.get("/google/revoke", revokeGoogle);

export default router;

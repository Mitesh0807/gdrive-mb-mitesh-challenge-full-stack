import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/connection";
import logger from "./utils/logger";
import router from "./routes";
dotenv.config();

(async () => await connectDB())();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.listen(process.env.PORT || 8000, () => {
  logger.info(`Server started on port ${process.env.PORT || 8000}`);
});

import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import logger from "../utils/logger";

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("Mongo URI not found");
    }
    const conn = await mongoose.connect(process.env.MONGO_URI, {});

    logger.info(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error: any) {
    console.log(error);
    logger.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;

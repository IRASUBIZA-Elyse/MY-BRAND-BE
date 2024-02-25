import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const DB_URL = process.env.MONGODB_URL || "";
const Database = async (): Promise<void> => {
  try {
    await mongoose.connect(DB_URL);
    console.log("It's connected");
  } catch (error) {
    console.log(error);
  }
};
export default Database;

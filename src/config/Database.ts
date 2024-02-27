import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const mongodb = process.env.MONGODB_URL || "";
const Database = async (): Promise<void> => {
  try {
    await mongoose.connect(mongodb);
    console.log("It's connected");
  } catch (error) {
    console.log(error);
  }
};
export default Database;

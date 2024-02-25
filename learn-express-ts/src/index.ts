import express from "express";
import mongoose from "mongoose";
import routes from "./routes/routes";
import userRouter from "./routes/userRoutes";
import dotenv from "dotenv";
import Database from "./config/Database";
dotenv.config();

const port: number = parseInt(process.env.PORT!, 10);
const mongoUrl: string = process.env.MONGODB_URL!;

const app = express();
app.use(express.json());
app.use("/api", routes);
app.use("/api", userRouter);
Database();
app.listen(port, () => {
  console.log(`Server has started! on port ${port}`);
});
export default app;

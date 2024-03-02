import express from "express";
import mongoose from "mongoose";
import routes from "./routes/routes";
//import userRouter from "./routes/userRoutes";
import dotenv from "dotenv";

import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "./swagger.json";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", routes);
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
//app.use("/api", userRouter);

export default app;

import express from "express";
import mongoose from "mongoose";
import routes from "./routes/routes";
import dotenv from "dotenv";

import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "./swagger.json";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(cors());
app.use("/api", routes);
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default app;

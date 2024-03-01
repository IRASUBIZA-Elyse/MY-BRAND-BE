import express from "express";
import mongoose from "mongoose";
import routes from "./routes/routes";
//import userRouter from "./routes/userRoutes";
import dotenv from "dotenv";

import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "./swagger.json";
import cors from "cors";

dotenv.config();
const app = express();
// const options = {
//   definition: {
//     openapi: "3.0.0",
//     info: {
//       title: "Blog API",
//       version: "1.0.0",
//       description: "This is the API for the blog",
//     },
//     servers: [
//       {
//         url: "http://localhost:4000",
//       },
//     ],
//   },
//   apis: ["./src/routes/routes.ts"],
// };
// const swaggerSpec = swaggerJSDoc(options);

const mongoUrl: string = process.env.MONGODB_URL!;

app.use(express.json());
app.use("/api", routes);
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
//app.use("/api", userRouter);

app.use(cors());
export default app;

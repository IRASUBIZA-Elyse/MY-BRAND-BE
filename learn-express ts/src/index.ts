import express from "express";
import mongoose from "mongoose";
import routes from "./routes/routes.js";
import dotenv from "dotenv";
dotenv.config();
const port: number = parseInt(process.env.PORT!, 10);
// mongoose
//   .connect("mongodb://localhost:27017/acmedb", { useNewUrlParser: true })
//   .then(() => {
//     const app = express();
//     app.use(express.json());
//     app.use("/api", routes);

//     app.listen(4500, () => {
//       console.log("Server has started!");
//     });
//   });
const app = express();
const connectToDB = async () => {
  app.use(express.json());
  app.use("/api", routes);
  try {
    await mongoose.connect(
      "mongodb://localhost:27017/acmedb?useNewUrlParser=true"
    );
    console.log("Connected to MongoDb");
  } catch (error) {
    console.log(error);
    // process.exit(1);
  }
};
connectToDB();
app.listen(port, () => {
  console.log("Server has started!");
});

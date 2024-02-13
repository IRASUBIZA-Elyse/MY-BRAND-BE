const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");

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
    await mongoose.connect("mongodb://localhost:27017/acmedb", {
      useNewUrlParser: true,
      // useUnidefiedTopology: true,
    });
    console.log("Connected to MongoDb");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
connectToDB();
app.listen(4500, () => {
  console.log("Server has started!");
});

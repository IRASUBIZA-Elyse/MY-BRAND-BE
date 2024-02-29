import dotenv from "dotenv";
import app from "./index";
import Database from "./config/Database";
dotenv.config();

const port: number = parseInt(process.env.PORT!, 10);
Database();
app.listen(port, () => {
  console.log(`Server has started! on port ${port}`);
  //swaggerDocs(app, port);
});

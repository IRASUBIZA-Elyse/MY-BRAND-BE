import { Schema, model } from "mongoose";
const querryschema = new Schema({
  author: String,
  email: String,
  content: String,
  phoneNumber: String,
  // createdAt: String,
});
const Querry = model("querry", querryschema);
export default Querry;

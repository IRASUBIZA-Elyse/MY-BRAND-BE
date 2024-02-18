import { Schema, model } from "mongoose";
const querryschema = new Schema({
  author: String,
  email: String,
  content: String,
  phoneNUmber: Number,
  createdAt: String,
});
const Querry = model("querry", querryschema);
export default Querry;

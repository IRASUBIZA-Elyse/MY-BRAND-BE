import { Schema, model } from "mongoose";
const querryschema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  message: String,
  phoneNumber: String,
  // createdAt: String,
});
const Querry = model("querry", querryschema);
export default Querry;

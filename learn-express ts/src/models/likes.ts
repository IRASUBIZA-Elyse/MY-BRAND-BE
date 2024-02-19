import { boolean } from "joi";
import { Schema, model } from "mongoose";

const likesSchema = new Schema({
  name: String,
});
const Likes = model("likes", likesSchema);
export default Likes;

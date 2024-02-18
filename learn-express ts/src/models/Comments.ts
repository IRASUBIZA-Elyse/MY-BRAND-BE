import { Schema, model } from "mongoose";

// interface Icomment extends Document {
//   author: Types.ObjectId;
//   email: string;
//   content: string;
//   blog: Types.ObjectId;
//   createdAt: Date;
// }
const commentSchema = new Schema({
  author: String,
  email: String,
  content: String,
  blog: String,
  createdAt: String,
});

const Comment = model("Comment", commentSchema);

export default Comment;

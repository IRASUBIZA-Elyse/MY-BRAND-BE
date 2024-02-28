import { Schema, model, Types } from "mongoose";

// interface Icomment extends Document {
//   author: Types.ObjectId;
//   email: string;
//   content: string;
//   blog: Types.ObjectId;
//   createdAt: Date;
// }
const commentSchema = new Schema({
  name: String,
  email: String,
  content: String,
  blogId: Types.ObjectId,
  createdAt: String,
});

const Comment = model("Comment", commentSchema);

export default Comment;

import { Schema, model } from "mongoose";

const Blogschema = new Schema({
  title: {
    type: String,
    require: true,
  },
  content: {
    type: String,
    require: true,
  },
  // comments: {
  //   text: String,
  // },
  // likes: {
  //   type: Number,
  //   default: 0,
  // },
  // author: String,
});

const Blog = model("Blog", Blogschema);
export default Blog;

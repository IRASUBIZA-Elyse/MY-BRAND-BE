import { Schema, model } from "mongoose";

const Blogschema = new Schema({
  title: String,
  content: String,
  // author: String,
});

const Blog = model("Blog", Blogschema);
export default Blog;

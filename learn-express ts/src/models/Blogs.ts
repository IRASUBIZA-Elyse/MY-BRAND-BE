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
});

const Blog = model("Blog", Blogschema);
export default Blog;

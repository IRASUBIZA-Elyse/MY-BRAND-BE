import Blog from "../models/Blogs";
import Comment from "../models/Comments";
import { Request, Response } from "express";
import { Error } from "mongoose";
import { blogValidationSchema } from "../validation/validation";
import cloudinary from "../utilis/cloudinary";

export const getBlog = async (req: Request, res: Response) => {
  try {
    const Blogschema = await Blog.find();
    res.send(Blogschema);
  } catch (error) {
    res.status(500).send({ error: Error.messages });
  }
};

export const likeBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    blog.likes++; // here i Incremented likes..
    await blog.save();
    res.status(200).json({ likes: blog.likes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
// export const getAllLikes = async (req: Request, res:Response)=>
// { try {}}
//likeBlog
export const createBlog = async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body;
    const { error } = blogValidationSchema.validate({ title, content });

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    if (!req.file) {
      return res.status(400).json({ error: "Image file is required" });
    }

    const result = await cloudinary.uploader.upload(req.file.path);

    const blog = await Blog.create({
      title,
      content,
      image: result.secure_url,
      date: new Date(),
    });

    res.status(201).json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

export const getByBlobById = async (req: Request, res: Response) => {
  try {
    const blog = await Blog.findOne({ _id: req.params.id });
    //const comment = await Comment.findById({ blogId: req.params.id });
    const result = {
      blog,
      //comment
    };
    res.send(result);
  } catch {
    res.status(404);
    res.send({ error: "Blog doesn't exist!" });
  }
};

// Update a specific Blog by ID
export const updateBlog = async (req: Request, res: Response) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(blog);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a specific Blog by ID
export const deleteBlog = async (req: Request, res: Response) => {
  try {
    await Blog.deleteOne({ _id: req.params.id });
    res.status(204).send();
    res.json({ message: "Blog deleted successfully" });
  } catch {
    res.status(404);
    res.send({ error: "Blog doesn't exist!" });
  }
};

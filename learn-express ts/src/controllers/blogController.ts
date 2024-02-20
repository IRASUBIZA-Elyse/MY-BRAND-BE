import Blog from "../models/Blogs";
import { Request, Response } from "express";
import { Error } from "mongoose";
import { blogValidationSchema } from "../validation/validation";

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

//likeBlog
export const createBlog = async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body;
    const { error } = blogValidationSchema.validate({
      title,
      content,
    });
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const blog = await Blog.create({ title, content, date: new Date() });
    res.status(201).json(blog);
  } catch (error) {
    res.status(400).send({ error: Error.messages });
  }
};

export const getByBlobById = async (req: Request, res: Response) => {
  try {
    const blog = await Blog.findOne({ _id: req.params.id });
    res.send(blog);
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
  } catch {
    res.status(404);
    res.send({ error: "Blog doesn't exist!" });
  }
};

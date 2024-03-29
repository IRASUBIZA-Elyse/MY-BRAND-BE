import Blog from "../models/Blogs";
import Comment from "../models/Comments";
import { Request, Response } from "express";
import { Error } from "mongoose";
import { blogValidationSchema } from "../validation/validation";
import cloudinary from "../utilis/cloudinary";
import { ObjectId } from "mongodb";

export const getBlog = async (req: Request, res: Response) => {
  try {
    const Blogschema = await Blog.find();
    res.status(200).json(Blogschema);
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
    let image = null;

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      image = result ? result.secure_url : null;
    }

    const { title, content } = req.body;
    const { error } = blogValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).send({ error: error.details[0].message });
    }

    const blog = new Blog({
      title,
      content,
      image,
      date: new Date(),
    });

    const savedBlog = await blog.save();
    res.status(201).send({ savedBlog, message: "Blog created successfully!!" });
  } catch (error) {
    res.status(500).send({ message: (error as Error).message });
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
    res.status(200).json(blog);
  } catch {
    res.status(404);
    res.send({ error: "Blog doesn't exist!" });
  }
};

// Update a specific Blog by ID
export const updateBlog = async (req: Request, res: Response) => {
  // try {
  //   const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
  //     new: true,
  //   });
  //   res.json(blog);
  // } catch (err: any) {
  //   res.status(400).json({ message: err.message });
  // }
  const id = req.params.id;
  if (!ObjectId.isValid(id)) {
    return res.status(400).send({ error: "Invalid blog ID" });
  }
  const blogId = new ObjectId(id); // Create an ObjectId

  const blog = await Blog.findById(blogId); // Use the converted ObjectId
  if (!blog) {
    res.status(404).send({ error: "Blog not found" });
    return;
  }
  if (req.body.title) {
    blog.title = req.body.title;
  }
  if (req.body.content) {
    blog.content = req.body.content;
  }
  if (req.file?.path) {
    const path = req.file?.path as string;
    const result = await cloudinary.uploader.upload(path);
    blog.image = result?.secure_url;
  }
  await blog.save();
  res.status(201).send({ message: "blog updated successfully", blog });
};

// Delete a specific Blog by ID
export const deleteBlog = async (req: Request, res: Response) => {
  try {
    await Blog.deleteOne({ _id: req.params.id });
    res.send({ message: "Blog deleted successfully" });
  } catch {
    res.status(404);
    res.send({ error: "Blog doesn't exist!" });
  }
};

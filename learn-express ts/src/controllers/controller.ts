import Blog from "../models/Blogs";
import { Request, Response } from "express";
import { Error } from "mongoose";

export const getBlog = async (req: Request, res: Response) => {
  try {
    const Blogschema = await Blog.find();
    res.send(Blogschema);
  } catch (error) {
    res.status(500).send({ error: Error.messages });
  }
};

export const createBlog = async (req: Request, res: Response) => {
  try {
    const blog = await Blog.create(req.body);
    res.status(201).json(blog);
  } catch (err) {
    res.status(400).send({ error: Error.messages });
  }
};
// export const commentsBlog = async (req: Request, res: Response) => {
//   try {
//     const blog = await Blog.create(req.body.comments);
//     res.status(201).json(blog);
//   } catch (err) {
//     res.status(400).send({ error: Error.messages });
//   }
//   res.status(200).send({
//     message: "comment succefully added",
//     data: {},
//   });
// };
// export const likeBlog = async (req:Request, res:Response){
//   try{
//      const blogId = req.params.id;

//   } catch(err) {
//     res.status(404).send({ error: Error.messages });
//   }
// }

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

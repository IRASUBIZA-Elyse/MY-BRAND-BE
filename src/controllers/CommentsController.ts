import Comment from "../models/Comments";
import { Request, Response } from "express";
import Blogs from "../models/Blogs";
import { Error } from "mongoose";
import { commentValidationSchema } from "../validation/validation";

export const createComment = async (req: Request, res: Response) => {
  try {
    const { content, email, name } = req.body;
    const { error } = commentValidationSchema.validate({
      name,
      content,
      email,
    });
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const blogId = req.params.id;
    const blog = await Blogs.findOne({ _id: blogId });
    if (!blog) {
      return res.status(404).send({ error: "Blog Not Found" });
    }
    const comment = new Comment({
      content: req.body.content,
      email: req.body.email,
      name: req.body.name,
      blogId: blog._id,
    });

    await comment.save();

    res.status(201).json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
export const getAllComments = async (req: Request, res: Response) => {
  try {
    const comments = await Comment.find();
    res.status(200).json(comments);
  } catch (error) {
    res.status(404).send({ message: "not found" });
  }
};
// export const getComments = async (req: Request, res: Response) => {
//   try {
//     const blogId = req.params.id;

//     const blog = await Comment.find({ blogId });
//     if (!blog) {
//       return res.status(404).json({ message: "Blog does not exist" });
//     }
//     res.json(blog);

//     // const comment = new Comment({
//     //   content: req.body.content,
//     //   email: req.body.email,
//     //   name: req.body.name,
//     // });

//     // await comment.save();
//   } catch (err) {
//     res.status(500).json({ message: (err as Error).message });
//   }
// };

export const getComment = async (req: Request, res: Response) => {
  try {
    const blogId = req.params.id;
    const comment = await Comment.find({ blogId: blogId });
    if (!comment) {
      res.status(404).send({ message: "comment not found" });
      return;
    } else {
      res.status(200).json(comment);
    }
  } catch (error) {
    res.status(500).send({ error: "server not found" });
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  try {
    await Comment.findByIdAndDelete(req.params.id);
    res.json({ message: "the comment is deleted" });
  } catch (err: any) {
    res.status(400).json({ message: "err.message" });
  }
};

export const Commentupdate = async (req: Request, res: Response) => {
  try {
    const blog = await Comment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(blog);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

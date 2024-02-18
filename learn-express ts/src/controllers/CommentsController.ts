import Comment from "../models/Comments";
import { Request, Response } from "express";
import { Error } from "mongoose";

export const createComment = async (req: Request, res: Response) => {
  try {
    const contents = await req.body.content;
    const blogId = req.params.id;

    if (!contents) {
      return res.status(400).json({ message: "Content is required" });
    }

    const comment = new Comment({
      content: contents,
      email: req.body.email,
      author: req.body.author,
      blog: blogId,
    });

    await comment.save();

    res.status(201).json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getComments = async (req: Request, res: Response) => {
  try {
    // const commentid=req.params.id;
    const blog = await Comment.find();

    res.json(blog);

    const comment = new Comment({
      content: req.body.content,
      email: req.body.email,
      author: req.body.author,
    });

    await comment.save();
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

export const getBlogComment = async (req: Request, res: Response) => {
  try {
    const blog = await Comment.findById(req.params.id);
    if (!blog) {
      return res
        .status(404)
        .json({ message: "Not found, may be deleted / never created" });
    }
    res.status(200).send(blog);
  } catch (err: any) {
    res.status(400).json({ message: "Ooops not found ! Check Typo?" });
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

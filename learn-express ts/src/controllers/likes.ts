import { Request, Response } from "express";
import Likes from "../models/likes";
import { Error } from "mongoose";
// import jwt from 'jsonwebtoken';
// import { Error } from 'mongoose';

export const createlike = async (req: Request, res: Response) => {
  try {
    const contents = await req.body.content;
    const blogId = req.params.id;

    // You may want to perform additional validation on the content
    if (!contents) {
      return res.status(400).json({ message: "Content is required" });
    }

    const comment = new Likes({ name: req.body.name, content: contents });

    await comment.save();

    res.status(201).json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
export const alllikes = async (req: Request, res: Response) => {
  try {
    const blogId = req.params.id;
    // const commentid=req.params.id;
    const blog = await Likes.find();

    res.json(blog);

    const comment = new Likes({
      name: req.body.name,
      content: req.body.content,
    });

    await comment.save();
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

export const getSinglelikes = async (req: Request, res: Response) => {
  try {
    const blog = await Likes.findById(req.params.id);
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

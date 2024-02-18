import { Request, Response } from "express";
import Querry from "../models/querries";
import { Error } from "mongoose";

export const createQuerry = async (req: Request, res: Response) => {
  try {
    const thisquerries = await req.body;
    if (!thisquerries) {
      return res.status(400).json({ message: "required" });
    }
    const realquerry = new Querry({
      author: req.body.author,
      content: req.body.content,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      createdAt: req.body.createdAt,
    });
    await realquerry.save();
    res.json(realquerry);
  } catch (err) {}
};

export const getallQuerry = async (req: Request, res: Response) => {
  try {
    const theques = await Querry.find();
    res.send(theques);
  } catch (err) {
    res.status(400).json({ message: (err as Error).message });
  }
};

export const getSingleQuerry = async (req: Request, res: Response) => {
  try {
    const thisquerries = await Querry.findById(req.params.id);
    if (!thisquerries) {
      return res.json({ message: "Querry not Found" });
    }
    res.json(thisquerries);
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

import { Request, Response } from "express";
import Querry from "../models/querries";
import { Error } from "mongoose";
import { querryValidationSchema } from "../validation/validation";

export const createQuerry = async (req: Request, res: Response) => {
  try {
    const { name, content, email, phoneNumber } = req.body;
    const { error } = querryValidationSchema.validate({
      name,
      content,
      email,
      phoneNumber,
    });
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const realquerry = new Querry({
      name: req.body.name,
      content: req.body.content,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      // createdAt: req.body.createdAt,
    });
    await realquerry.save();
    res.json(realquerry);
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

export const getallQuerry = async (req: Request, res: Response) => {
  try {
    const thequerries = await Querry.find();
    res.json(thequerries);
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

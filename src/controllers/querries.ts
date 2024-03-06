import { Request, Response } from "express";
import Querry from "../models/querries";
import { Error } from "mongoose";
import { querryValidationSchema } from "../validation/validation";

export const createQuerry = async (req: Request, res: Response) => {
  try {
    const { lastName, firstName, message, email, phoneNumber } = req.body;
    const { error } = querryValidationSchema.validate({
      lastName,
      firstName,
      message,
      email,
      phoneNumber,
    });
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const realquerry = new Querry({
      lastName: req.body.lastName,
      firstName: req.body.firstName,
      message: req.body.message,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
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
    if (!thequerries) {
      return res.status(404).json({ message: "No queries found" });
    }
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
export const deleteQuerry = async (req: Request, res: Response) => {
  try {
    const thisquerries = await Querry.findByIdAndDelete(req.params.id);
    if (!thisquerries) {
      return res.json({ message: "Querry not Found" });
    }
    res.status(200).json({ message: "query deleted" });
  } catch (err) {
    res.status(404).json({ message: (err as Error).message });
  }
};

import { Response, Request } from "express";
import User from "../models/User";
import { Error } from "mongoose";

export const UserSignUp = async (req: Request, res: Response) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.send("user with given email exists");
    const thisUser = await req.body;
    if (!thisUser) {
      return res.status(400).json({ message: "required" });
    }
    const realUser = new User({
      fullName: req.body.author,
      email: req.body.email,
      password: req.body.content,
      // createdAt: req.body.createdAt,
    });
    await realUser.save();
    res.json(realUser);
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

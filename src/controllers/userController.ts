import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import _ from "lodash";
import { userSignup, userLogin } from "../validation/userValidation";
import { Response, Request } from "express";
import User from "../models/userModel";

dotenv.config();

export const createUser = async (req: Request, res: Response) => {
  const userData = _.pick(req.body, ["userName", "email", "password"]);

  const { error } = userSignup.validate(userData);
  if (error) {
    res.status(400).send({ data: [], message: "", error: error.message });
    return;
  }

  try {
    const user = await User.findOne({ email: userData.email });
    if (user) {
      res
        .status(409)
        .send({ data: [], message: "User already exist", error: "" });
      return;
    } else {
      const hashedPassword = bcrypt.hashSync(userData.password, 9);
      const newUser = new User({ ...userData, password: hashedPassword });
      const created = await newUser.save();
      if (created) {
        const jwtSecret = (process.env.JWT_SECRET as string) || "secret";
        const tokenExpire = process.env.TOKEN_EXPIRES || "2h";
        const token = jwt.sign({ userId: created._id }, jwtSecret, {
          expiresIn: tokenExpire,
        });

        res.status(200).header("Authorization", `Bearer ${token}`).send({
          data: token,
          message: "Signed up successfully!!",
          error: null,
        });
      }
    }
  } catch (error: any) {
    res.status(400).send({ data: [], message: "", error: error.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const userData = _.pick(req.body, ["email", "password"]);

  const { error } = userLogin.validate(userData);
  if (error) {
    return res
      .status(400)
      .send({ data: [], message: "", error: error.message });
  }

  try {
    const user = await User.findOne({ email: userData.email });
    if (user) {
      const isValid = await bcrypt.compareSync(
        userData.password,
        user.password
      );
      if (!isValid) {
        return res.status(400).send({
          data: [],
          message: "Invalid email or password ...",
          error: null,
        });
      } else {
        const jwtSecret = (process.env.JWT_SECRET as string) || "secret";
        const tokenExpire = process.env.TOKEN_EXPIRES || "2h";
        const token = jwt.sign(
          { userId: user._id, userName: user.userName, email: user.email },
          jwtSecret,
          {
            expiresIn: tokenExpire,
          }
        );

        res.status(200).header("Authorization", `Bearer ${token}`).send({
          data: token,
          message: "Signed in successfully!!",
          error: null,
        });
      }
    } else {
      return res.status(404).send({
        data: [],
        message: "User not found please register!!",
        error: null,
      });
    }
  } catch (error: any) {
    return res
      .status(400)
      .send({ data: [], message: "", error: error.message });
  }
};

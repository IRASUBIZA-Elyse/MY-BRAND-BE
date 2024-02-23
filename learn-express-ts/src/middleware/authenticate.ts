import { Response, Request, NextFunction } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import User, { userInterface } from "../models/userModel";
import { Error } from "mongoose";

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate(
    "jwt",
    { session: false },
    (err: any, user: userInterface, info: any) => {
      if (err) {
        return res
          .status(400)
          .send({ data: [], message: "error", error: err.message });
      }
      if (!user) {
        return res
          .status(400)
          .send({ data: [], message: "Not authorized!!", error: null });
      }
      req.user = user;
      next();
    }
  )(req, res, next);
};

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    return res.send("not authorized ...");
  }

  if (!("role" in req.user)) {
    return res.send("not authorized ...");
  }

  if (req.user.role === "admin") {
    next();
  } else {
    return res.send("unauthorized content ...");
  }
};

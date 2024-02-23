import { Request, Response, NextFunction, ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = res.statusCode || 500;
  const message = error.message || "There was something going on";

  res.status(statusCode).send({ message, success: false, data: null });
};
export default errorHandler;

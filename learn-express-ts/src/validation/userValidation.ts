import Joi from "joi";

export const userSignup = Joi.object({
  userName: Joi.string().min(2).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});
export const userLogin = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

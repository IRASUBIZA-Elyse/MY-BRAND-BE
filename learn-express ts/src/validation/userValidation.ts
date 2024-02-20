import Joi from "joi";

export const userValidation = Joi.object({
  fullName: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

import Joi from "joi";

// export const validateBlog = (blog: { title: string; content: string }) => {
//   const blogSchema = Joi.object({
//     title: Joi.string().required(),
//     content: Joi.string().min(30).required(),
//   });
//   return blogSchema.validate(blog);
// };

export const blogValidationSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().min(30).required(),
});
export const likeValidationSchema = Joi.object({
  name: Joi.string().required(),
  content: Joi.string().required(),
});
export const commentValidationSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  content: Joi.string().required(),
});
export const querryValidationSchema = Joi.object({
  name: Joi.string().min(2).required(),
  content: Joi.string().min(30).required(),
  email: Joi.string().email().required(),
  phoneNumber: Joi.string().min(10).required(),
});
// export const validateComment = (comment: {
//   author: String;
//   email: String;
//   content: String;
//   blog: String;
// }) => {
//   const commentSchema = Joi.object({
//     author: Joi.string().min(2).required(),
//     email: Joi.string().email().required(),
//     content: Joi.string().min(30).required(),
//   });
//   return commentSchema.validate(comment);
// };

// export const querries = (queries: {
//   author: String;
//   email: String;
//   content: String;
//   phoneNUmber: String;
// }) => {
//   const querriesSchema = Joi.object({
//     author: Joi.string().min(2).required(),
//     email: Joi.string().email().required(),
//     content: Joi.string().min(30).required(),
//     phoneNumber: Joi.string().min(10).required(),
//   });
//   return querriesSchema.validate(queries);
// };

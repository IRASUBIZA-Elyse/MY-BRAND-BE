"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.querryValidationSchema = exports.commentValidationSchema = exports.likeValidationSchema = exports.blogValidationSchema = void 0;
const joi_1 = __importDefault(require("joi"));
// export const validateBlog = (blog: { title: string; content: string }) => {
//   const blogSchema = Joi.object({
//     title: Joi.string().required(),
//     content: Joi.string().min(30).required(),
//   });
//   return blogSchema.validate(blog);
// };
exports.blogValidationSchema = joi_1.default.object({
    tittle: joi_1.default.string().required(),
    content: joi_1.default.string().min(30).required(),
});
exports.likeValidationSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    content: joi_1.default.string().required(),
});
exports.commentValidationSchema = joi_1.default.object({
    author: joi_1.default.string().required(),
    email: joi_1.default.string().required(),
    content: joi_1.default.string().required(),
});
exports.querryValidationSchema = joi_1.default.object({
    author: joi_1.default.string().min(2).required(),
    content: joi_1.default.string().min(30).required(),
    email: joi_1.default.string().email().required(),
    phoneNumber: joi_1.default.string().min(10).required(),
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

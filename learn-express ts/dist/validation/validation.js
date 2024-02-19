"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.querries = exports.validateComment = exports.validateBlog = void 0;
const joi_1 = __importDefault(require("joi"));
const validateBlog = (blog) => {
    const blogSchema = joi_1.default.object({
        title: joi_1.default.string().required(),
        content: joi_1.default.string().min(30).required(),
    });
    return blogSchema.validate(blog);
};
exports.validateBlog = validateBlog;
const validateComment = (comment) => {
    const commentSchema = joi_1.default.object({
        author: joi_1.default.string().min(2).required(),
        email: joi_1.default.string().email().required(),
        content: joi_1.default.string().min(30).required(),
    });
    return commentSchema.validate(comment);
};
exports.validateComment = validateComment;
const querries = (queries) => {
    const querriesSchema = joi_1.default.object({
        author: joi_1.default.string().min(2).required(),
        email: joi_1.default.string().email().required(),
        content: joi_1.default.string().min(30).required(),
        phoneNumber: joi_1.default.string().min(10).required(),
    });
    return querriesSchema.validate(queries);
};
exports.querries = querries;

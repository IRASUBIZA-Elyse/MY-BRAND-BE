"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// interface Icomment extends Document {
//   author: Types.ObjectId;
//   email: string;
//   content: string;
//   blog: Types.ObjectId;
//   createdAt: Date;
// }
const commentSchema = new mongoose_1.Schema({
    author: String,
    email: String,
    content: String,
    blogId: mongoose_1.Types.ObjectId,
    createdAt: String,
});
const Comment = (0, mongoose_1.model)("Comment", commentSchema);
exports.default = Comment;

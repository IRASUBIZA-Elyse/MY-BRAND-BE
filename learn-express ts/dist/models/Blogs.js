"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Blogschema = new mongoose_1.Schema({
    title: {
        type: String,
        require: true,
    },
    content: {
        type: String,
        require: true,
    },
    // comments: {
    //   text: String,
    // },
    // likes: {
    //   type: Number,
    //   default: 0,
    // },
    // author: String,
});
const Blog = (0, mongoose_1.model)("Blog", Blogschema);
exports.default = Blog;

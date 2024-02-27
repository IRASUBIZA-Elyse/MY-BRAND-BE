"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBlog = exports.updateBlog = exports.getByBlobById = exports.createBlog = exports.likeBlog = exports.getBlog = void 0;
const Blogs_1 = __importDefault(require("../models/Blogs"));
const mongoose_1 = require("mongoose");
const validation_1 = require("../validation/validation");
const cloudinary_1 = __importDefault(require("../tools/cloudinary"));
const getBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Blogschema = yield Blogs_1.default.find();
        res.send(Blogschema);
    }
    catch (error) {
        res.status(500).send({ error: mongoose_1.Error.messages });
    }
});
exports.getBlog = getBlog;
const likeBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const blog = yield Blogs_1.default.findById(id);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        blog.likes++; // here i Incremented likes..
        yield blog.save();
        res.status(200).json({ likes: blog.likes });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.likeBlog = likeBlog;
// export const getAllLikes = async (req: Request, res:Response)=>
// { try {}}
//likeBlog
const createBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, content } = req.body;
        const { error } = validation_1.blogValidationSchema.validate({ title, content });
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        if (!req.file) {
            return res.status(400).json({ error: "Image file is required" });
        }
        const result = yield cloudinary_1.default.uploader.upload(req.file.path);
        const blog = yield Blogs_1.default.create({
            title,
            content,
            image: result.secure_url,
            date: new Date(),
        });
        res.status(201).json(blog);
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ error: "Internal Server Error" });
    }
});
exports.createBlog = createBlog;
const getByBlobById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blog = yield Blogs_1.default.findOne({ _id: req.params.id });
        //const comment = await Comment.findById({ blogId: req.params.id });
        const result = {
            blog,
            //comment
        };
        res.send(result);
    }
    catch (_a) {
        res.status(404);
        res.send({ error: "Blog doesn't exist!" });
    }
});
exports.getByBlobById = getByBlobById;
// Update a specific Blog by ID
const updateBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blog = yield Blogs_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.json(blog);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});
exports.updateBlog = updateBlog;
// Delete a specific Blog by ID
const deleteBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Blogs_1.default.deleteOne({ _id: req.params.id });
        res.status(204).send();
        res.json({ message: "Blog deleted successfully" });
    }
    catch (_b) {
        res.status(404);
        res.send({ error: "Blog doesn't exist!" });
    }
});
exports.deleteBlog = deleteBlog;

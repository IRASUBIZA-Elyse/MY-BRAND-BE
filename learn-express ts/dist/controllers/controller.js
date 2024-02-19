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
exports.deleteBlog = exports.updateBlog = exports.getByBlobById = exports.createBlog = exports.getBlog = void 0;
const Blogs_1 = __importDefault(require("../models/Blogs"));
const mongoose_1 = require("mongoose");
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
const createBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const valid = validateBlog(req.body)
        // console.log(valid)
        const blog = yield Blogs_1.default.create(req.body);
        res.status(201).json(blog);
    }
    catch (err) {
        res.status(400).send({ error: mongoose_1.Error.messages });
    }
});
exports.createBlog = createBlog;
const getByBlobById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blog = yield Blogs_1.default.findOne({ _id: req.params.id });
        res.send(blog);
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
    }
    catch (_b) {
        res.status(404);
        res.send({ error: "Blog doesn't exist!" });
    }
});
exports.deleteBlog = deleteBlog;

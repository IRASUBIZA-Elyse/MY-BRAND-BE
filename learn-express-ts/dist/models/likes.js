"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const likesSchema = new mongoose_1.Schema({
    name: String,
});
const Likes = (0, mongoose_1.model)("likes", likesSchema);
exports.default = Likes;

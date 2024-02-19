"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const querryschema = new mongoose_1.Schema({
    author: String,
    email: String,
    content: String,
    phoneNumber: String,
    // createdAt: String,
});
const Querry = (0, mongoose_1.model)("querry", querryschema);
exports.default = Querry;

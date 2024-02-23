"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLogin = exports.userSignup = void 0;
const joi_1 = __importDefault(require("joi"));
exports.userSignup = joi_1.default.object({
    userName: joi_1.default.string().min(2).max(30).required(),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(8).required(),
});
exports.userLogin = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required(),
});

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const joi_1 = __importDefault(require("joi"));
exports.userValidation = joi_1.default.object({
    fullName: joi_1.default.string().min(2).required(),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required(),
});
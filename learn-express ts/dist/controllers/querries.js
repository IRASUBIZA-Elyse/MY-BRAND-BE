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
exports.getSingleQuerry = exports.getallQuerry = exports.createQuerry = void 0;
const querries_1 = __importDefault(require("../models/querries"));
const createQuerry = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const thisquerries = yield req.body;
        if (!thisquerries) {
            return res.status(400).json({ message: "required" });
        }
        const realquerry = new querries_1.default({
            author: req.body.author,
            content: req.body.content,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            createdAt: req.body.createdAt,
        });
        yield realquerry.save();
        res.json(realquerry);
    }
    catch (err) { }
});
exports.createQuerry = createQuerry;
const getallQuerry = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const theques = yield querries_1.default.find();
        res.send(theques);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});
exports.getallQuerry = getallQuerry;
const getSingleQuerry = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const thisquerries = yield querries_1.default.findById(req.params.id);
        if (!thisquerries) {
            return res.json({ message: "Querry not Found" });
        }
        res.json(thisquerries);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.getSingleQuerry = getSingleQuerry;

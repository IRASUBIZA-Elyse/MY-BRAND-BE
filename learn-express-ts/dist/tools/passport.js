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
const passport_1 = __importDefault(require("passport"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = __importDefault(require("../models/user"));
const localStrategy = require("passport-local").Strategy;
passport_1.default.use("register", new localStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true,
}, (req, email, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const username = (_a = req.body) === null || _a === void 0 ? void 0 : _a.username;
        const user = yield user_1.default.create({ email, password, username });
        return done(null, user);
    }
    catch (error) {
        done(error);
    }
})));
passport_1.default.use("login", new localStrategy({
    usernameField: "email",
    passwordField: "password",
}, (email, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findOne({ email });
        if (!user) {
            return done(null, false, { message: "User does not exist" });
        }
        const compare = yield bcrypt_1.default.compare(password, user.password);
        if (!compare) {
            return done(null, false, { message: "Invalid Password" });
        }
        return done(null, user, { message: "Signed in Successfully" });
    }
    catch (error) {
        return done(error);
    }
})));
exports.default = passport_1.default;

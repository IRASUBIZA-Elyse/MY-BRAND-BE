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
const User_1 = __importDefault(require("../models/User"));
const passport_local_1 = require("passport-local");
const passport_jwt_1 = require("passport-jwt");
passport_1.default.use("Signup", new passport_local_1.Strategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true,
}, (req, email, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const username = (_a = req.body) === null || _a === void 0 ? void 0 : _a.userName;
        const user = yield User_1.default.create({ email, password, username });
        return done(null, user);
    }
    catch (error) {
        done(error);
    }
})));
passport_1.default.use("Login", new passport_local_1.Strategy({ usernameField: "email", passwordField: "password" }, (email, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findOne({ email });
        if (!user) {
            return done(null, false, { message: "Incorrect email" });
        }
        const validate = yield user.isValidPassword(password);
        if (!validate) {
            return done(null, false, { message: "Incorrect password" });
        }
        return done(null, user, { message: "logged in Successfully" });
    }
    catch (error) {
        return done(error);
    }
})));
passport_1.default.use(new passport_jwt_1.Strategy({
    secretOrKey: "TOP_SECRET",
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromUrlQueryParameter("secret_token"),
}, (token, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return done(null, token.user);
    }
    catch (error) {
        done(error);
    }
})));
exports.default = passport_1.default;

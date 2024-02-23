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
exports.secureRoute = exports.login = exports.signup = void 0;
const passport_1 = __importDefault(require("../tools/passport"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({
        message: "register successful",
        user: req.user,
    });
});
exports.signup = signup;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    passport_1.default.authenticate("login", (err, user, info) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (err || !user) {
                const error = new Error((info === null || info === void 0 ? void 0 : info.message) || "An error occurred.");
                return next(error);
            }
            req.login(user, { session: false }, (error) => __awaiter(void 0, void 0, void 0, function* () {
                if (error)
                    return next(error);
                const body = { _id: user._id, email: user.email };
                const token = jsonwebtoken_1.default.sign({ user: body }, "TOP_SECRET");
                const message = info.message;
                return res.json({ token, message });
            }));
        }
        catch (error) {
            return next(error);
        }
    }))(req, res, next);
});
exports.login = login;
const secureRoute = (req, res, next) => {
    res.json({
        message: "You made it to the secure route",
        user: req.user,
        token: req.query.secret_token,
    });
};
exports.secureRoute = secureRoute;

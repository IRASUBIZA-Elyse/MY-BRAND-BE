"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = exports.isAuthenticated = void 0;
const passport_1 = __importDefault(require("passport"));
const isAuthenticated = (req, res, next) => {
    passport_1.default.authenticate("jwt", { session: false }, (err, user, info) => {
        if (err) {
            return res
                .status(400)
                .send({ data: [], message: "error", error: err.message });
        }
        if (!user) {
            return res
                .status(400)
                .send({ data: [], message: "Not authorized", error: null });
        }
        req.user = user;
        next();
    })(req, res, next);
};
exports.isAuthenticated = isAuthenticated;
const isAdmin = (req, res, next) => {
    if (!req.user) {
        return res.send("not authorized");
    }
    if (!("role" in req.user)) {
        return res.send("role not provided");
    }
    if (req.user.role == "admin") {
        next();
    }
    else {
        return res.send("unauthorized content ..");
    }
};
exports.isAdmin = isAdmin;

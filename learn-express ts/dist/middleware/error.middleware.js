"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (error, req, res, next) => {
    const statusCode = res.statusCode || 500;
    const message = error.message || "There was something going on";
    res.status(statusCode).send({ message, success: false, data: null });
};
exports.default = errorHandler;

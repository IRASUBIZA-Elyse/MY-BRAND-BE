"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes/routes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const dotenv_1 = __importDefault(require("dotenv"));
const Database_1 = __importDefault(require("./config/Database"));
dotenv_1.default.config();
const port = parseInt(process.env.PORT, 10);
const mongoUrl = process.env.MONGODB_URL;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api", routes_1.default);
app.use("/api", userRoutes_1.default);
(0, Database_1.default)();
app.listen(port, () => {
    console.log(`Server has started! on port ${port}`);
});
exports.default = app;

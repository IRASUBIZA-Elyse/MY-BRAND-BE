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
const globals_1 = require("@jest/globals");
const index_1 = __importDefault(require("../src/index"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const supertest_1 = __importDefault(require("supertest"));
dotenv_1.default.config();
const DB_URL = process.env.MONGODB_URl || "";
(0, globals_1.beforeAll)(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connect(DB_URL);
}), 50000);
(0, globals_1.afterAll)(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connection.close();
}));
(0, globals_1.describe)("Test APIs before", () => {
    (0, globals_1.it)("/api/ for 404", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, supertest_1.default)(index_1.default).get("/api/");
        (0, globals_1.expect)(result.status).toBe(404);
    }));
    (0, globals_1.it)("/api/ for 200", () => __awaiter(void 0, void 0, void 0, function* () {
        const show = yield (0, supertest_1.default)(index_1.default).get("/api/blog");
        (0, globals_1.expect)(show.status).toBe(200);
    }));
    (0, globals_1.it)("/api/ for 200", () => __awaiter(void 0, void 0, void 0, function* () {
        const show = yield (0, supertest_1.default)(index_1.default).get("/api/query");
        (0, globals_1.expect)(show.status).toBe(200);
    }));
    (0, globals_1.it)("/api/ for 404", () => __awaiter(void 0, void 0, void 0, function* () {
        const show = yield (0, supertest_1.default)(index_1.default).get("/api/signup");
        (0, globals_1.expect)(show.status).toBe(404);
    }));
    (0, globals_1.it)("/api/ for 404", () => __awaiter(void 0, void 0, void 0, function* () {
        const show = yield (0, supertest_1.default)(index_1.default).get("/api/login");
        (0, globals_1.expect)(show.status).toBe(404);
    }));
});

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
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const routes_js_1 = __importDefault(require("./routes/routes.js"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const port = parseInt(process.env.PORT, 10);
const mongoUrl = process.env.MONGODB_URL;
// mongoose
//   .connect("mongodb://localhost:27017/acmedb", { useNewUrlParser: true })
//   .then(() => {
//     const app = express();
//     app.use(express.json());
//     app.use("/api", routes);
//     app.listen(4500, () => {
//       console.log("Server has started!");
//     });
//   });
const app = (0, express_1.default)();
const connectToDB = () => __awaiter(void 0, void 0, void 0, function* () {
    app.use(express_1.default.json());
    app.use("/api", routes_js_1.default);
    app.use("/api", userRoutes_1.default);
    try {
        yield mongoose_1.default.connect("mongodb://localhost:27017/acmedb?useNewUrlParser=true");
        console.log("Connected to MongoDb");
    }
    catch (error) {
        console.log(error);
        // process.exit(1);
    }
});
connectToDB();
app.listen(port, () => {
    console.log("Server has started!");
});
exports.default = connectToDB;

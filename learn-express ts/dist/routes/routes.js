"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Controller = __importStar(require("../controllers/controller"));
const Querry = __importStar(require("../controllers/querries"));
const Comments = __importStar(require("../controllers/CommentsController"));
// import {
//   createComment,
//   getComments,
//   getBlogComment,
//   deleteComment,
//   Commentupdate,
// } from "../controllers/CommentsController";
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
//  Get all blogs
router.get("/blogs", Controller.getBlog);
router.post("/blogs", Controller.createBlog);
router.get("/blogs/:id", Controller.getByBlobById);
router.patch("/blogs/:id", Controller.updateBlog);
router.delete("/blogs/:id", Controller.deleteBlog);
//comment
router.post("/blogs/:id/comments", Comments.createComment);
router.get("/blogs/:id/comments", Comments.getComments);
router.get("/blogs/:id/comments/:id", Comments.getBlogComment);
router.delete("/blogs/:id/comments/:id", Comments.deleteComment);
router.patch("/blogs/:id/comments/:id", Comments.Commentupdate);
// comment second way
// router.route("/posts/:id/comments").post(createComment);
// router.route("/posts/:id/comments").get(getComments);
// router.route("/posts/:id/comments/:id").get(getBlogComment);
// router.route("/posts/:id/comments/:id").delete(deleteComment);
// router.route("/posts/:id/comments/:id").patch(Commentupdate);
// like blog
router.get("/blogs", Querry.getallQuerry);
router.get("/blogs/:id", Querry.getSingleQuerry);
router.post("/blogs/:id", Querry.createQuerry);
exports.default = router;

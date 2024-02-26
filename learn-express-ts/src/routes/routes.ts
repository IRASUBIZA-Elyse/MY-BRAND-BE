import * as Controller from "../controllers/blogController";
import * as Querry from "../controllers/querries";
import * as Comments from "../controllers/CommentsController";
import upload from "../tools/multer";
import express from "express";
import { Query } from "mongoose";
import passport from "passport";
//import Passport from "../middleware/passport";
import { isAdmin, isAuthenticated } from "../middleware/authenticate";
const router = express.Router();

//  Get all blogs
router.get("/blogs", isAuthenticated, Controller.getBlog);
router.post(
  "/blogs",
  isAuthenticated,
  upload.single("image"),
  Controller.createBlog
);
router.get("/blogs/:id", Controller.getByBlobById);
router.patch("/blogs/:id", upload.single("image"), Controller.updateBlog);
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

// querry blog
router.post("/query", Querry.createQuerry);
router.get("/query", Querry.getallQuerry);
router.get("/query/:id", Querry.getSingleQuerry);

// likes blog
router.post("/blogs/:id/like", Controller.likeBlog);
//router.get("/blogs/:id/like", Controller.getAllLikes);

export default router;

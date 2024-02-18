import * as Controller from "../controllers/controller";
import * as Comments from "../controllers/CommentsController";
import express from "express";
const router = express.Router();

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

// like blog
// router.post("/blogs/:id", Controller.likeBlog);

export default router;

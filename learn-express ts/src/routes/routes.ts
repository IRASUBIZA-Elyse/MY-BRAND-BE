import * as Controller from "../controllers/controller";
import express from "express";
const router = express.Router();

//  Get all blogs
router.get("/blogs", Controller.getBlog);

// create blog
router.post("/blogs", Controller.createBlog);

// get specific blog
router.get("/blogs/:id", Controller.getByBlobById);

// Update a specific post by ID
router.patch("/blogs/:id", Controller.updateBlog);

// Delete a specific post by ID
router.delete("/blogs/:id", Controller.deleteBlog);

// create comment
router.post("/blogs/:id/comments/create", Controller.commentsBlog);

// like blog
// router.post("/blogs/:id", Controller.likeBlog);

export default router;

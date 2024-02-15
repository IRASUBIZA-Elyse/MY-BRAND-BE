import * as Controller from "../controllers/controller";
import express from "express";
const router = express.Router();

router.get("/blogs", Controller.getBlog);

router.post("/blogs", Controller.createBlog);
router.post("/blogs/:id/comments/create", Controller.commentsBlog);

router.get("/blogs/:id", Controller.getByBlobById);

// Update a specific post by ID
router.patch("/blogs/:id", Controller.updateBlog);

// Delete a specific post by ID
router.delete("/blogs/:id", Controller.deleteBlog);

export default router;

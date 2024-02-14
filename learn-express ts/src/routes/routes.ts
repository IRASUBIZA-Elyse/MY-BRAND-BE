import * as Controller from "../controllers/controller";
import express from "express";
const router = express.Router();
router.get("/blogs", Controller.getBlog);

router.post("/blogs", Controller.createBlog);

router.get("/posts/:id", Controller.getByBlobById);

// Update a specific post by ID
router.patch("/posts/:id", Controller.updateBlog);

// Delete a specific post by ID
router.delete("/posts/:id", Controller.deleteBlog);

export default router;

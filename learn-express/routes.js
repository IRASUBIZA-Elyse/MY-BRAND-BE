import Post from "./models/Post.js";
import express from "express";
// import { router } from "Router";
// const express = require("express");
// const Post = require("./models/Post");
// const router = express.Router();

router.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find();
    res.send(posts);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.post("/posts", async (req, res) => {
  try {
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
    });
    await post.save();
    res.send(post);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.get("/posts/:id", async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });
    res.send(post);
  } catch {
    res.status(404);
    res.send({ error: "Post doesn't exist!" });
  }
});

// Update a specific post by ID
router.patch("/posts/:id", async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });

    if (req.body.title) {
      post.title = req.body.title;
    }

    if (req.body.content) {
      post.content = req.body.content;
    }

    await post.save();
    res.send(post);
  } catch {
    res.status(404);
    res.send({ error: "Post doesn't exist!" });
  }
});

// Delete a specific post by ID
router.delete("/posts/:id", async (req, res) => {
  try {
    await Post.deleteOne({ _id: req.params.id });
    res.status(204).send();
  } catch {
    res.status(404);
    res.send({ error: "Post doesn't exist!" });
  }
});

// module.exports = router;
export default router;

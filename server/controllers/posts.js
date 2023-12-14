

const express = require('express');
const mongoose = require('mongoose');
const posts = require("../models/posts");
const routerPosts = express.Router();

// Create
routerPosts.post("/", async (req, res) => {
  try {
    const newCourse = await posts.create(req.body);
    return res.status(201).json(newCourse);
  } catch (error) {
    return res.status(500).json({ error: "Could not create course" });
  }
});

// Read all
routerPosts.get("/", async (req, res) => {
  try {
    const courses = await posts.find();
    return res.status(200).json(courses);
  } catch (error) {
    return res.status(500).json({ error: "Could not retrieve courses" });
  }
});

// Read by ID
routerPosts.get("/:id", async (req, res) => {
  try {
    const course = await posts.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    return res.status(200).json(course);
  } catch (error) {
    return res.status(500).json({ error: "Could not retrieve course" });
  }
});
// Update Likes, LikedBy, and Comments
routerPosts.patch("/:id", async (req, res) => {
  try {
    const { likes, likedBy, comments } = req.body;

    // Update likes, likedBy, and comments for the post
    const updatedPost = await posts.findByIdAndUpdate(
      req.params.id,
      { likes, likedBy, comments },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    return res.status(200).json(updatedPost);
  } catch (error) {
    return res.status(500).json({ error: "Could not update post" });
  }
});
// Update
routerPosts.put("/:id", async (req, res) => {
  try {
    const updatedCourse = await posts.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedCourse) {
      return res.status(404).json({ error: "Course not found" });
    }
    return res.status(200).json(updatedCourse);
  } catch (error) {
    return res.status(500).json({ error: "Could not update course" });
  }
});

// Delete
routerPosts.delete("/:id", async (req, res) => {
  try {
    const deletedCourse = await posts.findByIdAndDelete(req.params.id);
    if (!deletedCourse) {
      return res.status(404).json({ error: "Course not found" });
    }
    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ error: "Could not delete course" });
  }
});

module.exports = routerPosts;

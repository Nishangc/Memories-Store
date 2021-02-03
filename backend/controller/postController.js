import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
import PostMessage from "../models/postModel.js";

//@desc Fetch all posts
//@route GET/api/posts
//@access Public
export const getPosts = asyncHandler(async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

//@desc Fetch single posts
//@route GET/api/posts/:id
//@access Public
export const getPostById = asyncHandler(async (req, res) => {
  try {
    const postMessages = await PostMessage.findById(req.params.id);
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

//@desc Delete single posts
//@route DELETE/api/posts/:id
//@access Public
export const deletePost = asyncHandler(async (req, res) => {
  const post = await PostMessage.findById(req.params.id);

  if (post) {
    await post.remove();
    res.json({ message: "Post removed successfully!!" });
  } else {
    res.status(404);
    throw new Error("Post not found");
  }
});

//@desc Create post
//@route GET/api/posts
//@access Public

export const createPost = asyncHandler(async (req, res) => {
  const post = req.body;
  const createdPost = await PostMessage.create(post);
  res.status(201).json(createdPost);
});

//@desc Like post
//@route PUT/api/posts/:id/likePost
//@access Public

export const likePost = asyncHandler(async (req, res) => {
  const { likeCount } = req.body;

  const post = await PostMessage.findById(req.params.id);

  if (post) {
    post.likeCount = post.likeCount + 1;
    const updatedPost = await post.save();
    res.json(updatedPost);
  } else {
    res.status(404);
    throw new Error("Post not found");
  }
});

//@desc Update post
//@route PUT/api/posts/:id
//@access Public

export const updatePost = asyncHandler(async (req, res) => {
  const { creator, title, message, tags, selectedFile } = req.body;

  const post = await PostMessage.findById(req.params.id);

  if (post) {
    post.creator = creator ? creator : post.creator;
    post.title = title ? title : post.title;
    post.message = message ? message : post.message;
    post.tags = tags ? tags : post.tags;
    post.selectedFile = selectedFile ? selectedFile : post.selectedFile;

    const updatedPost = await post.save();
    res.json(updatedPost);
  } else {
    res.status(404);
    throw new Error("Post not found");
  }
});

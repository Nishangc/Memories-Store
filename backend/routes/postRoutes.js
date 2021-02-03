import express from "express";
import {
  getPosts,
  createPost,
  updatePost,
  getPostById,
  deletePost,
  likePost,
} from "../controller/postController.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPostById);
router.delete("/:id", deletePost);
router.post("/", createPost);
router.put("/:id", updatePost);
router.put("/:id/likePost", likePost);

export default router;

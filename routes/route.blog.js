import express from "express";
import {
  addBlog,
  deleteBlogs,
  editBlog,
  statusChange,
  viewAllBlogs,
} from "../controllers/controller.blog.js";
const router = express.Router();

router.post("/", addBlog);
router.put("/:id", editBlog);
router.get("/", viewAllBlogs);
router.delete("/:id", deleteBlogs);
router.post("/changeStatus/:id", statusChange);

export default router;

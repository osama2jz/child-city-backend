import express from "express";
import {
  addBlog,
  deleteBlogs,
  editBlog,
  statusChange,
  viewAllBlogs,
  viewSingleBlog,
} from "../controllers/controller.blog.js";
const router = express.Router();

router.post("/", addBlog);
router.put("/:id", editBlog);
router.get("/", viewAllBlogs);
router.get("/:id", viewSingleBlog);
router.delete("/:id", deleteBlogs);
router.post("/changeStatus/:id", statusChange);

export default router;

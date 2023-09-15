import express from "express";
import {
  addCategory,
  deleteCategory,
  editCategory,
  statusChange,
  viewAllCategories,
} from "../controllers/controller.category.js";
const router = express.Router();

router.post("/", addCategory);
router.put("/:id", editCategory);
router.get("/", viewAllCategories);
// router.delete("/delete/:id", deleteCategory);
router.post("/changeStatus/:id", statusChange);

export default router;

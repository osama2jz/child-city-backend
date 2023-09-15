import express from "express";
import {
  addCategory,
  deleteCategory,
  editCategory,
  statusChange,
  viewAllCategories,
} from "../controllers/controller.category.js";
const router = express.Router();

router.post("/add", addCategory);
router.put("/edit/:id", editCategory);
router.get("/all", viewAllCategories);
// router.delete("/delete/:id", deleteCategory);
router.post("/changeStatus/:id", statusChange);

export default router;

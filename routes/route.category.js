import express from "express";
import {
  addCategory,
  editCategory,
  statusChange,
  viewAllCategories,
} from "../controllers/controller.category.js";
const router = express.Router();

router.post("/", addCategory);
router.put("/:id", editCategory);
router.get("/", viewAllCategories);
router.post("/changeStatus/:id", statusChange);

export default router;

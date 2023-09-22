import express from "express";
import {
  addCategory,
  changeOrder,
  editCategory,
  statusChange,
  viewAllCategories,
} from "../controllers/controller.category.js";
const router = express.Router();

router.post("/", addCategory);
router.put("/:id", editCategory);
router.get("/", viewAllCategories);
router.patch("/changeOrder", changeOrder);
router.post("/changeStatus/:id", statusChange);

export default router;

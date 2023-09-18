import express from "express";
import {
  addSubCategory,
  editSubCategory,
  statusChange,
  viewAllSubCategories,
} from "../controllers/controller.subCategory.js";
const router = express.Router();

router.post("/", addSubCategory);
router.put("/:id", editSubCategory);
router.get("/", viewAllSubCategories);
router.post("/changeStatus/:id", statusChange);

export default router;

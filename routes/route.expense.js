import express from "express";
import {
  addExpense,
  deleteExpense,
  editExpense,
  viewAllExpense,
} from "../controllers/controller.expense.js";
const router = express.Router();

router.post("/", addExpense);
router.put("/:id", editExpense);
router.get("/", viewAllExpense);
router.delete("/:id", deleteExpense);

export default router;

import express from "express";
import {
  addExpense,
  deleteExpense,
  editExpense,
  viewAllExpense,
} from "../controllers/controller.expense.js";
const router = express.Router();

router.post("/add", addExpense);
router.put("/edit/:id", editExpense);
router.get("/all", viewAllExpense);
router.delete("/delete/:id", deleteExpense);

export default router;

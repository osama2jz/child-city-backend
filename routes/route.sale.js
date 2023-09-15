import express from "express";
import {
  addSale,
  deleteSale,
  editSale,
  statusChange,
  viewAllSales,
} from "../controllers/controller.sale.js";
const router = express.Router();

router.post("/", addSale);
router.put("/:id", editSale);
router.get("/", viewAllSales);
router.delete("/:id", deleteSale);
router.post("/changeStatus/:id", statusChange);

export default router;

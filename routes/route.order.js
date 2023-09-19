import express from "express";
import {
  addOrder,
  statusChange,
  viewOrderById,
  viewOrders,
} from "../controllers/controller.order.js";
const router = express.Router();

router.post("/", addOrder);
router.get("/", viewOrders);
router.get("/:id", viewOrderById);
router.post("/changeStatus/:id", statusChange);

export default router;

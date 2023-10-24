import express from "express";
import {
  addOrder,
  deleteOrder,
  statusChange,
  viewOrderById,
  viewOrders,
  viewSingleOrderById,
} from "../controllers/controller.order.js";
const router = express.Router();

router.post("/", addOrder);
router.get("/", viewOrders);
router.get("/:id", viewOrderById);
router.get("/single/:id", viewSingleOrderById);
router.delete("/:id", deleteOrder);
router.post("/changeStatus/:id", statusChange);

export default router;

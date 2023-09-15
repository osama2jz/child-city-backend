import express from "express";
import {
  addRevenue,
  viewAllRevenue,
} from "../controllers/controller.revenue.js";
const router = express.Router();

router.post("/", addRevenue);
router.get("/", viewAllRevenue);

export default router;

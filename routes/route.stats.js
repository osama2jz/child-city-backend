import express from "express";
import { viewRevenue, viewSales } from "../controllers/controller.stats.js";
const router = express.Router();

router.get("/view-sales", viewSales);
router.get("/view-revenue", viewRevenue);

export default router;

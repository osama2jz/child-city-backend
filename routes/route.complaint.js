import express from "express";
import {
  addComplaint,
  viewAllComplaints,
  statusChange,
} from "../controllers/controller.complaints.js";
const router = express.Router();

router.post("/", addComplaint);
router.get("/", viewAllComplaints);
router.post("/changeStatus/:id", statusChange);

export default router;

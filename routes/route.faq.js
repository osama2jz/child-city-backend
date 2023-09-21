import express from "express";
import {
  addFaq,
  deleteFaq,
  editFaq,
  statusChange,
  viewAllFaqs,
} from "../controllers/controller.faq.js";
const router = express.Router();

router.post("/", addFaq);
router.put("/:id", editFaq);
router.get("/", viewAllFaqs);
router.delete("/:id", deleteFaq);
router.post("/changeStatus/:id", statusChange);

export default router;

import express from "express";
import {
  addCoupen,
  checkCoupen,
  deleteCoupen,
  editCoupen,
  statusChange,
  viewAllCoupens,
} from "../controllers/controller.coupen.js";
const router = express.Router();

router.post("/", addCoupen);
router.put("/:id", editCoupen);
router.get("/", viewAllCoupens);
router.delete("/:id", deleteCoupen);
router.post("/:code/:phone", checkCoupen);
router.post("/changeStatus/:id", statusChange);

export default router;

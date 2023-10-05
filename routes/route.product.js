import express from "express";
import {
  addProduct,
  deleteProduct,
  editProduct,
  statusChange,
  viewAllProduct,
  viewSingleProduct,
} from "../controllers/controller.product.js";
const router = express.Router();

router.post("/", addProduct);
router.put("/:id", editProduct);
router.get("/", viewAllProduct);
router.get("/:id", viewSingleProduct);
router.delete("/:id", deleteProduct);
router.post("/changeStatus/:id", statusChange);

export default router;

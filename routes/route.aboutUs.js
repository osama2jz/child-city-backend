import express from "express";
import { editAboutUs, viewAboutUs } from "../controllers/controller.aboutUs.js";
const router = express.Router();

router.get("/", viewAboutUs);
router.patch("/", editAboutUs);
export default router;

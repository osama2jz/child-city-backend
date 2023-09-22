import express from "express";
import {
  SignUp,
  Signin,
  changePassword,
  deleteUser,
  editProfile,
  statusChange,
  viewAllUsers,
  updateAddress,
  viweUser,
} from "../controllers/controller.userProfiling.js";
const router = express.Router();

router.post("/signin", Signin);
router.post("/signup", SignUp);
// router.get("/viewUser/:id", viweUser);
router.put("/editprofile/:id", editProfile);
router.put("/changeAddress/:id", updateAddress);
router.put("/changePassword/:id", changePassword);
router.get("/", viewAllUsers);
router.delete("/:id", deleteUser);
router.post("/changeStatus/:id", statusChange);

export default router;

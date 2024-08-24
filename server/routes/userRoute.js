import express from "express";
import {
  login,
  register,
  getAllUsers,
  logOut,
} from "../controllers/userController.js";
import { verifyUser } from "../middleware/verifyUser.js";
const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/allusers/:id", verifyUser, getAllUsers);
router.get("/logout/:id", verifyUser, logOut);

export { router as UserRouter };

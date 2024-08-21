import express from "express";
import {
  login,
  register,
  getAllUsers,
  logOut,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/allusers/:id", getAllUsers);
router.get("/logout/:id", logOut);

export { router as UserRouter };

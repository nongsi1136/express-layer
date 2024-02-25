import express from "express";
import UserController from "../controllers/users.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

const userController = new UserController();

router.post("/users/signup", userController.signup);
router.post("/users/signin", userController.signin);
router.get("/users/me", authMiddleware, userController.getProfile);

export default router;

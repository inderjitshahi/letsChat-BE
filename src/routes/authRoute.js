import express from "express";
import { register, login, logout, refreshToken } from "../controller/authController.js";
import trimRequest from "trim-request";
const router = express.Router();

router.route("/register").post(trimRequest.all, register);
router.route("/login").post(trimRequest.all, login);
router.route("/logout").post(trimRequest.all, logout);
router.route("/refreshToken").post(trimRequest.all, refreshToken);

export default router;
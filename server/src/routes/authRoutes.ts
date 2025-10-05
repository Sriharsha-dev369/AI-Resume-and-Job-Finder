import express from "express";
const router = express.Router();

const { signup, login } = require("../Controllers/authController");

router.post("/signup", signup);
router.post("/login", login);

export default router;
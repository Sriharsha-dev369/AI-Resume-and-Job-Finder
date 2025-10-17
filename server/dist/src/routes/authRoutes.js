"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
const { generateGoogleAuthURL } = require('../utils/googleAuth');
const { googleAuthCallback } = require('../controllers/authController');
// const { signup, login } = require("../Controllers/authController");
// router.post("/signup", signup);
// router.post("/login", login);
router.get("/google", (req, res) => {
    const url = generateGoogleAuthURL();
    res.redirect(url);
});
router.get("/google/callback", googleAuthCallback);
module.exports = router;
//# sourceMappingURL=authRoutes.js.map
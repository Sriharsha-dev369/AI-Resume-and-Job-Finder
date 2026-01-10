const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate");

const { generateGoogleAuthURL } = require("../utils/googleAuth");
const { googleAuthCallback } = require("../controllers/authController");

// const { signup, login } = require("../Controllers/authController");
// router.post("/signup", signup);
// router.post("/login", login);

router.get("/google", (req: any, res: any) => {
  const url = generateGoogleAuthURL();
  res.redirect(url);
});

router.get("/google/callback", googleAuthCallback);

router.get("/me", authenticate, (req: any, res: any) => {
  res.json({ user: req.user });
});

router.post("/logout", (req: any, res: any) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    path: "/",
  });
  res.sendStatus(204);
});

module.exports = router;

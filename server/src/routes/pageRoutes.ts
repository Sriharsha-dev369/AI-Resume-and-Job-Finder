const express = require("express");
const router = express.Router();
const { Authentication } = require("../middleware/auth");


router.get("/mainPage", Authentication, (req:any, res:any) => {
  res.json({ message: "This is protected data.", user: req.user });
});

module.exports = router;

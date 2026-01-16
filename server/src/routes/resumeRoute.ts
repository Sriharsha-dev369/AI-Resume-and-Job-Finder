const express = require("express");
const router = express.Router();
const {
  uploadAndStoreResume,
  upload,
  createResume,
  addPersonalInfo
} = require("../controllers/resumeController");
const { Authentication } = require("../middleware/auth");

router.post(
  "/upload-resume",
  Authentication,
  upload.single("pdf"),
  uploadAndStoreResume
);

router.post("/createResume", Authentication, createResume);
router.post("/:resumeId/personal-info",Authentication,addPersonalInfo)

module.exports = router;

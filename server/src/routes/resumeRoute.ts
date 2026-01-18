const express = require("express");
const router = express.Router();
const {
  uploadAndStoreResume,
  upload,
  createResume,
  addPersonalInfo,
  getPersonalInfo,
} = require("../controllers/resumeController");
const { Authentication } = require("../middleware/auth");
const { validatePersonalInfo } = require("../middleware/validator");
const { verifyResumeOwnership } = require("../middleware/resumeAuth");

router.post(
  "/upload-resume",
  Authentication,
  upload.single("pdf"),
  uploadAndStoreResume,
);

router.post("/createResume", Authentication, createResume);

router.get(
  "/:resumeId/personal-info",
  Authentication,
  verifyResumeOwnership,
  getPersonalInfo // New controller to fetch data
);

router.patch(
  "/:resumeId/personal-info-update",
  Authentication,
  validatePersonalInfo,
  verifyResumeOwnership,
  addPersonalInfo,
);

module.exports = router;

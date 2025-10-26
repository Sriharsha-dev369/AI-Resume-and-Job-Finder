const express = require("express");
const router = express.Router();
const { uploadAndStoreResume, upload } = require("../controllers/resumeController");
const { Authentication } = require("../middleware/auth");


router.post(
  "/upload-resume",
  Authentication,
  upload.single("pdf"),
  uploadAndStoreResume
);

module.exports = router;

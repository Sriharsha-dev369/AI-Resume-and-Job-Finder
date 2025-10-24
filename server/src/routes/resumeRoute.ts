const express = require("express");
const router = express.Router();
const { uploadAndStoreResume, upload } = require("../db/resumeUpload");
const { Authentication } = require("../middleware/auth");

const { resumeUpload } = require("");

router.post(
  "/upload-resume",
  Authentication,
  upload.single("pdf"),
  uploadAndStoreResume
);

module.exports = router;

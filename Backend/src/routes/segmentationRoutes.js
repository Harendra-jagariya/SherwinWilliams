const express = require("express");
const multer = require("multer");
const { segmentWalls } = require("../controllers/segmentationController");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/segment", upload.single("image"), segmentWalls);

module.exports = router;
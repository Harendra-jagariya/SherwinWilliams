const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();

// Storage configuration
const storage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, "uploads/"); // Store images in 'uploads' folder
   },
   filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
   },
});

const upload = multer({ storage });

// Image Upload Route
router.post("/upload", upload.single("image"), (req, res) => {
   if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
   }

   res.json({ message: "File uploaded successfully", filename: req.file.filename });
});

module.exports = router;
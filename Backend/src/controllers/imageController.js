const path = require("path");
const multer = require("multer");

// Set storage engine
const storage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, "uploads/"); // Files will be saved in the "uploads" directory
   },
   filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
   },
});

// File upload middleware
const upload = multer({ storage });

const uploadImage = (req, res) => {
   if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
   }
   res.status(200).json({ message: "File uploaded successfully", filename: req.file.filename });
};

module.exports = { upload, uploadImage };
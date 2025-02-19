const express = require("express");
const multer = require("multer");
const { segmentImage } = require("../controllers/segmentationController");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("image"), async (req, res) => {
   try {
      if (!req.file) {
         return res.status(400).json({ error: "No image uploaded" });
      }

      const imagePath = req.file.path;
      const segmentation = await segmentImage(imagePath);
      console.log("imagePath:", imagePath);
      console.log("segmentation:", segmentation);

      res.json({ mask: segmentation.segmentationMap.arraySync() }); // Returning mask as JSON
   } catch (error) {
      console.error("Segmentation Error:", error);
      res.status(500).json({ error: "Segmentation failed" });
   }
});

module.exports = router; 
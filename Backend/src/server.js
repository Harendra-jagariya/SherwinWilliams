const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const imageRoutes = require("./routes/imageRoutes");
const segmentationRoutes = require("./routes/segmentationRoutes");
const { segmentImage } = require("./controllers/segmentationController");
const tf = require("@tensorflow/tfjs");
require("@tensorflow/tfjs-backend-wasm");

(async () => {
   await tf.setBackend("wasm");
   await tf.ready();
   console.log("✅ TensorFlow.js is running on WASM backend!");
})();

const app = express();

app.use(cors());
app.use(express.json());

// Multer setup for file uploads
const upload = multer({ dest: path.join(__dirname, "uploads/") });

app.use("/api/images", imageRoutes);

app.post("/api/segment", upload.single("image"), async (req, res) => {
   try {
      if (!req.file) {
         return res.status(400).json({ error: "No image uploaded" });
      }

      const imagePath = req.file.path;
      const segmentation = await segmentImage(imagePath);
      console.log("imagePath", imagePath);
      console.log("segmentation", segmentation);

      res.json({ mask: segmentation.segmentationMap.arraySync() }); // Returning mask as JSON
   } catch (error) {
      console.error("Segmentation Error:", error);
      res.status(500).json({ error: "Segmentation failed" });
   }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
   console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

module.exports = app;

const express = require("express");
const cors = require("cors");
const imageRoutes = require("./routes/imageRoutes");
const segmentationRoutes = require("./routes/segmentationRoutes");
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
app.use(express.urlencoded({ extended: true }));

// Use routes
app.use("/api/images", imageRoutes);
app.use("/api/segment", segmentationRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
   console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

module.exports = app;
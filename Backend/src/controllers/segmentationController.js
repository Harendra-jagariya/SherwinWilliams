const tf = require("@tensorflow/tfjs-node");
const deeplab = require("@tensorflow-models/deeplab");
const fs = require("fs");

// Load the DeepLab model once
let model;

async function loadModel() {
   if (!model) {
      model = await deeplab.load({ base: "pascal" });
      console.log("✅ DeepLab model loaded!");
   }
}

// Load model at startup
loadModel();

async function segmentImage(imagePath) {
   try {
      if (!model) {
         throw new Error("Model is not loaded yet.");
      }

      // Read image as tensor
      const imageBuffer = fs.readFileSync(imagePath);
      const imageTensor = tf.node.decodeImage(imageBuffer);

      // Perform segmentation
      const segmentationMap = await model.segment(imageTensor);

      // Cleanup tensor memory
      imageTensor.dispose();

      return segmentationMap;
   } catch (error) {
      console.error("Segmentation Error:", error);
      throw error;
   }
}

module.exports = { segmentImage };
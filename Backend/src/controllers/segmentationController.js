const tf = require("@tensorflow/tfjs-node");
const deeplab = require("@tensorflow-models/deeplab");
const fs = require("fs");

// Load the DeepLab model
let model;

async function loadModel() {
   if (!model) {
      model = await deeplab.load({ base: "pascal" });
      console.log("✅ DeepLab model loaded!");
   }
}

async function segmentImage(imagePath) {
   await loadModel(); // Ensure model is loaded

   // Read image as tensor
   const imageBuffer = fs.readFileSync(imagePath);
   const imageTensor = tf.node.decodeImage(imageBuffer);

   // Perform segmentation
   const segmentationMap = await model.segment(imageTensor);
   return segmentationMap;
}

module.exports = { segmentImage };
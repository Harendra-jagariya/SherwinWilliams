const tf = require('@tensorflow/tfjs-node');
const deeplab = require('@tensorflow-models/deeplab');
const fs = require('fs');
const path = require('path');

/**
 * Segment the walls in an image using DeepLabV3.
 * @param {string} imagePath - Path to the image file.
 * @returns {Promise<tf.Tensor>} - Returns a tensor mask of the segmented image.
 */
async function segmentImage(imagePath) {
    try {
        // Load DeepLabV3 model
        const model = await deeplab.load({ base: 'pascal', quantizationBytes: 2 });

        // Read image file as buffer
        const imageBuffer = fs.readFileSync(imagePath);
        const imageTensor = tf.node.decodeImage(imageBuffer);

        // Perform segmentation
        const segmentation = await model.segment(imageTensor);

        return segmentation; // Segmentation output contains the mask
    } catch (error) {
        console.error('Error during segmentation:', error);
        throw error;
    }
}

module.exports = { segmentImage };
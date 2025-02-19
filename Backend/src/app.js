const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

const imageRoutes = require("./routes/imageRoutes");
const segmentationRoutes = require("./routes/segmentationRoutes");
const colorRoutes = require("./routes/colorRoutes");
const recommenderRoutes = require("./routes/recommenderRoutes");

const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
console.log("it is coming here  to test !!!")
// Routes
app.use("/api/images", imageRoutes);
app.use("/api/segmentation", segmentationRoutes);
app.use("/api/colors", colorRoutes);
app.use("/api/recommendations", recommenderRoutes);

// Default Route
app.get("/", (req, res) => {
   res.send({ message: "Welcome to AI Virtual Painter Backend" });
});

module.exports = app;
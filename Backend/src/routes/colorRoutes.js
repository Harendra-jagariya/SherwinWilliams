const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
   res.send({ message: "Color Routes Working!" });
});

module.exports = router;
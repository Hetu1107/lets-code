const express = require('express');
const router = express.Router();

router.use("/user",require("./user"));
router.use("/friends",require("./friends"));
router.use("/rooms",require("./rooms"));


module.exports = router;
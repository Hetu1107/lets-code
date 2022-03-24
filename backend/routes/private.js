const express = require('express');
const { returnAuthState } = require('../controllers/private');
const { protect } = require('../middleware/auth');
const router = express.Router();
router.route("/").get(protect,returnAuthState); // passing protect middleware and then getting the auth token 

module.exports = router;
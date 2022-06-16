const express = require('express');

const controller = require('./dashboard.controllers');
const router = express.Router();

router.get("/", controller.dashboard);
router.get("/getGallery", controller.getGallery);


module.exports = router;
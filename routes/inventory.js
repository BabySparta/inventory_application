const express = require("express");
const router = express.Router();

const item_controller = require('../controllers/itemController');
const type_controller = require('../controllers/typeController');

router.get("/", item_controller.index);

module.exports = router;
const express = require('express');

const router = express.Router();
const homecontroller = require('../controllers/home_controller');

console.log("router is loaded");

router.get('/', homecontroller.home);

router.use('/users', require('./users'));

module.exports = router;
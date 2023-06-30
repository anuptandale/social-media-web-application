const express = require('express');

const router = express.Router();
const homecontroller = require('../controllers/home_controller');

console.log("router is loaded");

router.get('/', homecontroller.home);

router.use('/users', require('./users'));
router.use('/posts',require('./post'));
router.use('/comments', require('./comments'));
router.use('/likes',require('./likes'));

router.use('/api', require('./api'));
module.exports = router;
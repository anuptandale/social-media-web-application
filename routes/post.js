const express = require('express');
const router = express.Router();
const passport = require('passport');

const postsController = require('../controllers/post_controller');

//as some one can go in inspect and can create form and he can write comment so we are checking at router level if user is not authenticate then /create will not called
router.post('/create',passport.checkAuthentication, postsController.create); 

router.get('/destroy/:id', passport.checkAuthentication, postsController.destroy);
module.exports = router;
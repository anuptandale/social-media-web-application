const express = require('express');
const router = express.Router();
const passport = require('passport');

const userController = require('../controllers/users_controller');
router.get('/profile/:id',passport.checkAuthentication, userController.profile); 
router.post('/update/:id', passport.checkAuthentication, userController.update);
//if user sign in then only he can see profile page else he will redirect to sign in page this happens using check authentication 

router.get('/sign-up', userController.signUp);
router.get('/sign-in', userController.signIn);

router.post('/create',userController.create);

//FOR MANUAL AUTHENTICATION
// router.post('/create-session',userController.createSession );

//use passport as a middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'}
),userController.createSession)

router.get('/sign-out',userController.signout);
module.exports = router;


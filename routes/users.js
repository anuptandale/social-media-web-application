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

//this route work when we click the button of google signin signup
router.get('/auth/google', passport.authenticate('google', {scope:['profile','email']})); //scope is part we want to fetch from google
//this route work when google find the user and send back to us
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect:'/users/sign-in'}), userController.createSession); 
//if fail then redirect to signin page else redirect to profile page

module.exports = router;


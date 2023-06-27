const passport = require('passport');
const JWTStratagy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/user');

let opts = {
    //header contain list of keys in which one is authorization and authorization also has list of keys in which it has one bearer which has jwt tokens 
    jwtFromRequest:ExtractJWT.fromAuthHeaderAsBearerToken,   
    secretOrKey : 'codeial' //for encryption and decryption this will use
}

passport.use(new JWTStratagy(opts, function(jwtPayLoad, done){ //function read data from payload and done is call back fun
    User.findById(jwtPayLoad._id, function(err, user){ //going to store complete user information in to payload in encrypted form 
        if(err){
            console.log('Error in finding user from JWT');
            return ;
        }
        if(user){
            return done(null, user); //error is null
        }else{
            return done(null, false);// user not found
        }
    })
}))
//here user is always present in jwt ,we are just fetchingout the id from the payload checking if the user is there or not

module.exports = passport;
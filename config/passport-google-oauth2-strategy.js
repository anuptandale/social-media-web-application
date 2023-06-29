const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

//tell passport to use a new strategy for google login
passport.use(new googleStrategy({
        clientID:"851381827569-j0sgg27lnjsck4221lc1do86ti6s01bb.apps.googleusercontent.com",
        clientSecret:"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",
        callbackURL:"http://localhost:7000/users/auth/google/callback"
        },
        function(accessToken, refreshToken, profile, done){
            User.findOne({email: profile.emails[0].value}).then(function(user, err){
                if(err){ console.log('error in google strategy-passport',err); return ; }

                // console.log(profile);

                if(user){
                    //if found,set this user as req.user
                    return done(null, user);
                }else{
                    //if not found, create the user and set it as req.user (req.user means signin that user)
                    User.create({  //insert new user in our database
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        password: crypto.randomBytes(20).toString('hex') //password of 20 length
                    });
                    return done(null,user) ;
                }
            });
        }
));

module.exports = passport;
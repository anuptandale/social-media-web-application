const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

//authentication using passport
passport.use(new LocalStrategy({ //telling passport to use local strategy
    usernameField: 'email',
    passReqToCallback: true // allows us to pass req in below function
    },
    function(req, email, password, done){
        User.findOne({email: email}).then(function(user,err){
            if(err){
                // console.log('Error in finding user --> Passport');
                req.flash('error', err);
                return done(err);   //done takes two argument first is error and second anything
            }
            if(!user || user.password != password){ //if user not found or password not match
                // console.log('Invalid Username/Password');
                req.flash('error','Invalid Username/Password');
                return done(null, false);// null= means err is not ,false= not authenticate
            }
            return done(null, user);
        });
    }
));

//serializing the user to decide which key is to be kept in cookies
passport.serializeUser(function(user,done){  //when user sign'sin we find the id ,send it to cookie and cookie send to the browser 
    done(null, user.id);
});

//deserializing the user from the key in the cookies
passport.deserializeUser(function(id,done){  //finding user using id when user will sign in again 
    User.findById(id).then(function(user,err){
        if(err){
            console.log('Error in finding user --> Passport');
            return done(err);   //done takes two argument first is error and second anything
        }
        return done(null,user);
    });
});

//check if the user is authenticated
passport.checkAuthentication = function(req, res, next){ //using this function as middleware
    //if user is not sign in ,then pass on the request to the next function( controller's action)
    if(req.isAuthenticated()){
        return next();
    }
    //if the user is not signin 
    return res.redirect('/users/sign-in');
}

passport.setAuthenticateUser = function(req, res, next){
    if(req.isAuthenticated()){
        //req.user contains the current signed in user from the sesssion cookie and we are just sending this to the locals for the views
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;
const User = require('../models/user');
module.exports.profile = function(req,res){
    return res.render('user_profile',{
        title: 'User Profile'
    })
};

// render the sign up page
module.exports.signUp = function(req,res){
    
    return res.render('user_signup',{
        title:"codial | Sign up"
    })
    
}

// render the sign in page
module.exports.signIn = function(req,res){
    return res.render('user_signin',{
        title:"codial | Sign In"
    })
}

// get the sign up data
module.exports.create = function(req,res){
    User.findOne({'name' : req.body.name}).then(function(data,err){
        if(err){
            console.log(err);
            return res.redirect('/users/sign-up');
        }
        if(!data){
            if(req.body.confirm_password==req.body.password){
                var mydata = new User(req.data);
                // mydata.save();
                return res.redirect('/users/sign-in');
            }else{
                console.log("password and confirm password are not matching");
                return res.redirect('/users/sign-up');
            }
        }else{
            return res.rediredt('/users/sign-up');
        }
    })
}

// sign in and create a session for the user
module.exports.createSession = function(req,res){

}
const User = require('../models/user');
module.exports.profile = function(req,res){
    return res.render('user_profile',{
        title: 'User Profile'
    })
};

// render the sign up page
module.exports.signUp = function(req,res){
    // if(req.body.password != req.body.confirm_password){
    //     return res.redirect('back');
    // }
    // if(!User){
    //     User.findOne({email: req.body.email}).then(User=>{
        
    //     if(!user){
    //         User.create(req.body, function(err,user){
                
    //             return res.redirect('/users/sign-in');
    //         })
    //     }else{
    //         return res.redirect('back');
    //     }
    // });
    // }
    return res.redirect('back');
}

// render the sign in page
module.exports.signIn = function(req,res){
    return res.render('user_signin',{
        title:"codial | Sign In"
    })
}

// get the sign up data
module.exports.create = function(req,res){

}

// sign in and create a session for the user
module.exports.createSession = function(req,res){

}
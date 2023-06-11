const { cookie } = require('express/lib/response');
const User = require('../models/user');



// render the sign up page
module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){ // using this function once we signin then we cannot go to sign up page
        return res.redirect('/users/profile');
    }
    return res.render('user_signup',{
        title:"codial | Sign up"
    })
    
}

// render the sign in page
module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_signin',{
        title:"codial | Sign In"
    })
}

//render the profile page
module.exports.profile = function(req,res){
    // if(req.cookies.user_id){
    //     User.findById(req.cookies.user_id).then( function(user,err){
    //         if(user){
    //             return res.render('profile',{
    //                 title:"user profile",
    //                 user:user
    //             })
    //         }else{
    //             return res.redirect('/users/sign-in');
    //         }
    //     })
    // }else{
    //     return res.redirect('/users/sign-in');
    // }
    return res.render('profile', {
        title: 'User Profile'
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
                var mydata = new User(req.body);
                // console.log(mydata);
                mydata.save();
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
module.exports.createSession = function(req, res){

    // steps to authenticate
    // find the user
    // User.findOne({email: req.body.email}).then(function( user,err){
    //     if(err){console.log('error in finding user in signing in'); return}
    //     // handle user found
    //     if (user){

    //         // handle password which doesn't match
    //         if (user.password != req.body.password){
    //             return res.redirect('back');
    //         }

    //         // handle session creation
    //         res.cookie('user_id', user.id);
    //         return res.redirect('/users/profile');

    //     }else{
    //         // handle user not found
    //         return res.redirect('back');
    //     }
    // });
    return res.redirect('/');
}
//  module.exports.signout = function(req,res){
//         if(err){
//             console.log('error in sign out process');
//         }
//             return res.redirect('/users/sign-in');
//     }
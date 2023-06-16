const Post = require('../models/post');
 
module.exports.home = function(req,res){
    // console.log(req.cookies);
    // res.cookie('user_it',25);

    // Post.find().then(function(posts,err){
    //     return res.render('home',{
    //         title: "Codeial | Home",
    //         posts: posts //ask om what the posts mean
    //     })
    // })
    Post.find()
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path: 'user'
        }
    })
    .then(function(posts,err){ // user is id of user stored in post dataset
        return res.render('home',{
            title: "codeial | Home",
            posts: posts
        })
    });
}
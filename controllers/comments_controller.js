const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function(req,res){
    Post.findById(req.body.post).then(function(post,err){ //name of input is post in home.ejs 
        if(post){
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            }).then(function(comment,err){
                post.comments.push(comment); // it will automatically fetchout id and push it
                post.save();

                res.redirect('/');
            })
        }
    })
} 
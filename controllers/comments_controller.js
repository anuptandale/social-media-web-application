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

module.exports.destroy = function(req,res){
    Comment.findById(req.params.id).then(function(comment, err){
        if(comment.user == req.user.id){
            let postId = comment.post; // if we directly delete the comment then post id will also get delete so we will first store the post id then delete the comment 
            comment.deleteOne();

            // using the post id we will find the comment is of which post and delete the comment from the post 
            Post.findByIdAndUpdate(postId, {$pull :{comments: req.params.id}}).then(function(post, err){ //we want postId and we want to pull from comments and what we want to pull that is req.params.id
                return res.redirect('back');
            })
        }else{
            return res.redirect('back');
        }
    })
}
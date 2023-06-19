const Post = require('../models/post');
const Comment = require('../models/comment');


module.exports.create = function(req,res){
    const mydata = new Post({
        content: req.body.content,
        user: req.user._id // we are storing a user id to identify which user has written comment
    });
    mydata.save();
    return res.redirect('back');
}

module.exports.destroy = function(req,res){
    Post.findById(req.params.id).then( function(post,err){
        //.id means converting the object id into string
        if(post.user == req.user.id){
            post.deleteOne();

            Comment.deleteMany({post: req.params.id}).then(function(err){
                return res.redirect('back');
            });
        }else{
            return res.redirect('back');
        }
    });
}
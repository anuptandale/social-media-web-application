const Post = require('../models/post');

module.exports.create = function(req,res){
    const mydata = new Post({
        content: req.body.content,
        user: req.user._id // we are storing a user id to identify which user has written comment
    });
    mydata.save();
    return res.redirect('back');
    
}
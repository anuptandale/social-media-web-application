const Post = require('../models/post');

module.exports.create = function(req,res){
    const mydata = new Post({
        content: req.body.content,
        user: req.user._id
    });
    mydata.save();
    return res.redirect('back');
    

}
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

// module.exports.destroy = function(req,res){
//     Post.findById(req.params.id).then( function(post,err){ //req.params.id will get id from url (/posts/destroy/:id)
//         //.id means converting the object id into string (in only string we compare)
//         if(post.user == req.user.id){
//             post.deleteOne();

//             Comment.deleteMany({post: req.params.id}).then(function(err){ //and we will require to delete all comments to that post
//                 return res.redirect('back');
//             });
//         }else{
//             return res.redirect('back');
//         }
//     });
// }

// writting destroy function using async
module.exports.destroy = async function(req,res){
    try{
    let post = await Post.findById(req.params.id); //req.params.id will get id from url (/posts/destroy/:id)
        //.id means converting the object id into string (in only string we compare)
        if(post.user == req.user.id){
            post.deleteOne();

            await Comment.deleteMany({post: req.params.id}); //and we will require to delete all comments to that post
                return res.redirect('back');
            
        }else{
            return res.redirect('back');
        }
    }catch(err){
        console.log('Error',err);
        return ;
    }
    
}

const Post = require('../../../models/post');
const Comment = require('../../../models/comment');

module.exports.index = async function( req,res){

    let posts = await Post.find() //in let posts = what we have written is used to find all posts from the database
        .sort('-createdAt')
        .populate('user')
        .populate({
            path:'comments',
            populate:{
                path: 'user'
            }
        });

    return res.json(200,{      //200 is ststus for ok
        message: "List of posts",
        posts: posts
    })
}

module.exports.destroy = async function(req,res){
    try{
        let post = await Post.findById(req.params.id);

        post.deleteOne();

        await Comment.deleteMany({post: req.params.id});

        return res.json(200,{
            message: "Post and associated comments deleted successfully"
        })


    }catch(err){
        return res.json(500,{
            message: "Internal server Error"
        });
    }
}
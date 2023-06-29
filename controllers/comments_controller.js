const Comment = require('../models/comment');
const Post = require('../models/post');
const commentsMailer = require('../mailer/comments_mailer');
const queue = require('../config/kue');
const commentEmailWorker = require('../worker/comment_email_worker');


module.exports.create = async function(req,res){
    try{
        let post = await Post.findById(req.body.post); //name of input is post in home.ejs 
        if(post){
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });
            post.comments.push(comment); // it will automatically fetchout id and push it
            post.save();
            comment = await comment.populate('user', 'name email');
            // commentsMailer.newComment(comment); // this will call newcomment and send mail 
            let job = queue.create('emails', comment).save(function(err){
                if(err){
                    console.log('error in creating a queue',err);
                }
                console.log('job enqueued',job.id);
            })
            res.redirect('/');
        }
    }catch(err){
        console.log('Error', err);
        return ;
    }
} 

module.exports.destroy = async function(req,res){
    try{
    let comment = await Comment.findById(req.params.id);
        if(comment.user == req.user.id){
            let postId = comment.post; // if we directly delete the comment then post id will also get delete so we will first store the post id then delete the comment 
            comment.deleteOne();

            // using the post id we will find the comment is of which post and delete the comment from the post 
            let post = await Post.findByIdAndUpdate(postId, {$pull :{comments: req.params.id}}); //we want postId and we want to pull from comments and what we want to pull that is req.params.id
            return res.redirect('back');
            
        }else{
            return res.redirect('back');
        }
    }catch(err){
        console.log('Error',err);
        return ;
    }
    
}
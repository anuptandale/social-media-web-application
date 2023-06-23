const Post = require('../models/post');
const User = require('../models/user') ;

// module.exports.home = function(req,res){
//     Post.find()
//     .populate('user')
//     .populate({
//         path:'comments',
//         populate:{
//             path: 'user'
//         }
//     })
//     .then(function(posts,err){ // user is id of user stored in post dataset

//         User.find({}).then(function(users, err){
//             return res.render('home',{
//                 title: "codeial | Home",
//                 posts: posts,
//                 all_users: users
//             })
//         });
        
//     });
// }
//above function using async 
try{
    module.exports.home = async function(req,res){
        let posts = await Post.find()
        .sort('-createdAt')
        .populate('user')
        .populate({
            path:'comments',
            populate:{
                path: 'user'
            }
        });
        let users = await User.find({});
        return res.render('home',{
            title: "codeial | Home",
            posts: posts,
            all_users: users
        });
    }
}catch(err){
    console.log('Error', err);
    return ;
}

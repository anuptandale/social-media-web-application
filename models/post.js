const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content:{
        type: String,
        require: true
    },user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' //we are refering  User schema
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment' //we are refering Comment schema
        }
    ],
    likes:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Like'
        }
    ]
},{
    timestamps: true
});

const Post = mongoose.model('Post',postSchema);

module.exports= Post;
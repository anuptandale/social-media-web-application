const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId
    },
    // this defines the object id of the liked object
    likeable:{
        type: mongoose.Schema.ObjectId,
        require: true,
        refPath: 'onModel' //placeing path some other field which tells on which type we have liked (post,comment)
    },
    // this field is used for defining the type of the liked object since this is a dynamic refrencing
    onModel:{
        type: String,
        require: true,
        enum: ['Post','Comment']
    }
},{
    timestamps: true
});

const Like = mongoose.model('Like', likeSchema);
module.exports = Like;
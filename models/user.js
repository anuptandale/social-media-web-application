const mongoose = require('mongoose');

const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/users/avatars');

const userSchema = new mongoose.Schema({
    name:String,
    email:{    //name will same as it is in the form
        type:String,
        unique:true
    },
    password:String
    ,
    avatar:{
        type: String
    }
}
,{
    timestamps: true
}
);

let storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(__dirname,'/..',AVATAR_PATH));
    },
    filename: function(req, file, cb){
        cb(null, file.fieldname + '-' + Date.now());
    }
    
});

// static methods
userSchema.statics.uploadedAvatar = multer({storage: storage}).single('avatar'); //single is use to allow only one file to upload
userSchema.statics.avatarPath = AVATAR_PATH; //making it publically available

const User = mongoose.model('User', userSchema);

module.exports= User;
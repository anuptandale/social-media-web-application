const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:String,
    email:{    //name will same as it is in the form
        type:String,
        unique:true
    },
    password:String
}
,{
    timestamps: true
}
);

const User = mongoose.model('User', userSchema);

module.exports= User;
const User = require('../../../models/user');
const jwt = require('jsonwebtoken');


///     ***************POST IN POSTMAN NOT WORKING ************
module.exports.createSession = async function(req,res){
    //we need to find that user and generate the jsonwebtoken for it
    try{
        let user = User.findOne({email: req.body.email});
        // console.log(user);
        console.log(user.password," ",req.body.password);
        if(!user || user.password != req.body.password){
            return res.status(422).json( {
                message: "Invalid username or password"
            });
        }
        
        return res.json(200, {
            message: 'Sign in successful, here is your token, please keep it safe!',
            data:{
                token: jwt.sign(JSON.stringify(user),'codeial',{expiresIn: '10000'}) //user.toJSON() get encrypted
            }
        })
    }catch(err){
        console.log('****',err);
        return res.json(500,{
            message: "Internal server Error"
        });
    }
}

module.exports.home = function(req,res){
    console.log(req.cookies);
    res.cookie('user_it',25);


    //we want our ejs file to run 
    return res.render('home',{
        title: "Home"
    });
}
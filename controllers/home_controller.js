module.exports.home = function(req,res){
    // return res.end('<h1>Express is up for codeial!</h1>');
    
    //we want our ejs file to run 
    return res.render('home',{
        title: "Home"
    });
}
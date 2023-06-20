module.exports.setFlash = function(req, res, next){
    res.locals.flash = {
        'success': req.flash('success'),
        'error': req.flash('error')
    }
    next();
}
// for displaying we are using req.flash... but to get it with responce while res.redirect 
// we have to put it in res.redirect('/', flash:{ ... }) but writing it alwayes is not a efficient way
// so we created middleware and if we once do flash.success in home.ejs it will handle it
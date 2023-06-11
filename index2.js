const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 7000;
const bodyparser = require('body-parser')
const db = require('./config/mongoose');

//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

app.use(express.urlencoded());

app.use(express.static('./assets'));

app.use(cookieParser());



//set up the view engine
app.set('view engine', 'ejs');
app.set('views','./views');
 
app.use(session({
    name:'codeial', //name of cookie
    //TODO change the secret before deployment
    secret: "blahsomething", //whenever encryption happens there is a key to encode it
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000 * 60 * 100)
    }
}));

app.use(passport.initialize());
app.use(passport.session());

//use express router
app.use('/',require('./routes/index'));    //we want app to use router


app.listen(port, function(err){
    if(err){ 
        console.log('Error: ',err);
        console.log(`Error:${err}`); //interpolation
    }
    console.log(`Server is running on port :${port}`);
});

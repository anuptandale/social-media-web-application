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
const MongoStore = require('connect-mongo');

// const sassMiddleware = require('node-sass');

// app.use(sassMiddleware({
//     src: './assets/scss',
//     dest: './assets/css',
//     debug: true,
//     outputStyle: 'extended',
//     prefix: '/css'
// }));

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
    saveUninitialized:false, //when the user has not logedin so his identity is not established so we dont want to store extra data in session cookie so false
    resave:false, //we do not want to store user data which is present in session cookie again and agin so false
    cookie:{
        maxAge:(1000 * 60 * 100)
    },
    store: MongoStore.create (
        {
            // mongooseConnection: db,
            mongoUrl:'mongodb://127.0.0.1:27017/Authentication_passport',
            autoRemove: 'disabled'
        },
        function(err){
            console.log(err || 'connect-mongodb setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticateUser);

//use express router
app.use('/',require('./routes/index'));    //we want app to use router


app.listen(port, function(err){
    if(err){ 
        console.log('Error: ',err);
        console.log(`Error:${err}`); //interpolation
    }
    console.log(`Server is running on port :${port}`);
});

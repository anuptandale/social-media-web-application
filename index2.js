const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 7000;
const db = require('./config/mongoose');
app.use(express.urlencoded());

app.use(express.static('./assets'));

app.use(cookieParser());


//use express router
app.use('/',require('./routes/index'));    //we want app to use router

//set up the view engine
app.set('view engine', 'ejs');
app.set('views','./views');
 
app.listen(port, function(err){
    if(err){ 
        console.log('Error: ',err);
        console.log(`Error:${err}`); //interpolation
    }
    console.log(`Server is running on port :${port}`);
});

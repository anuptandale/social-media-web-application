const express = require('express');
const app = express();
const port = 7000;

app.use('/',require('./routes/index'));    //we want app to use router

app.listen(port, function(err){
    if(err){
        console.log('Error: ',err);
        console.log(`Error:${err}`); //interpolation
    }
    console.log(`Server is running on port :${port}`);
});
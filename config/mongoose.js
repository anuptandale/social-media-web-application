// getting-started.js
const mongoose = require('mongoose');


mongoose.connect('mongodb://127.0.0.1:27017/codeial_users');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'error connecting to db'));

db.once('open',function(){
  console.log("connected ...........");
})

module.exports = db;
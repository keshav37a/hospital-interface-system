const port = 8000;
const express = require('express');
const db = require('./config/mongoose');
const app = new express();
const passport = require('passport');
const passportJWT = require('./config/passport-jwt-strategy');

app.use(express.urlencoded());

app.use(passport.initialize());

app.use('/', require('./routes/index'));



app.listen(port, function(err){
    if(err) { console.log(`error in starting server : ${err}`); return; }

    console.log(`server up and running on port ${8000}`);
})

module.exports = app;

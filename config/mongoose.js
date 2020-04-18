const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/doctor-patient-api');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error connecting to MongoDB'));

db.once('open', function(){
    console.log('successfully connected to database :: MongoDB');
})

module.exports = db;
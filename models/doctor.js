const mongoose = require('mongoose');
const doctorSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
},{
    timestamps: true
});

const Doctor = mongoose.model('doctor', doctorSchema);
module.exports = Doctor;
const mongoose = require('mongoose');
const doctorSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    phone:{
        type: Number,
        required: true
    },
},{
    timestamps: true
});

const Doctor = mongoose.model('doctor', doctorSchema);
module.exports = Doctor;
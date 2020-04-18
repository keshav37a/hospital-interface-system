const mongoose = require('mongoose');
const reportSchema = new mongoose.Schema({
    patient:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'patient',
        required: true
    },
    doctor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'doctor',
        required: true
    },
    status:{
        type: String,
        required: true
    }
},{
    timestamps: true
});

const Report = mongoose.model('doctor', reportSchema);
module.exports = Report;
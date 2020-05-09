const mongoose = require('mongoose');
const patientSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    reports: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'report'
    }]
},{
    timestamps: true
});

const Patient = mongoose.model('patient', patientSchema);
module.exports = Patient;
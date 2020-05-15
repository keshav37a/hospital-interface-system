const mongoose = require('mongoose');
const statsSchema = new mongoose.Schema({
    patients:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'patient',
    }],
    status:{
        type: String,
        required: true
    }
},{
    timestamps: true
});

const Stats = mongoose.model('stat', statsSchema);
module.exports = Stats;
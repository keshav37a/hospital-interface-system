const Doctor = require('../../../models/doctor');

module.exports.register = async function(req, res){
    console.log('doctors_controller.register called');    
    try{
        let createdDoctor = await Doctor.create(req.body);
        if(createdDoctor){
            return res.status(200).json({
                data: {
                    doctor:createdDoctor
                },
                message: 'Successfully registered doctor'
            });
        }
        else{
            return res.status(500).json({
                message: 'Server error'
            });
        }
    }
    catch(err){
        return res.status(500).json({
            message: `${err}`
        });
    }
    
}

module.exports.login = function(req, res){
    console.log('doctors_controller.login called');
    return res.status(200).json({
        message: 'Successfully logged in doctor'
    });
}

module.exports.getReportsByStatus = function(req, res){
    console.log('doctors_controller.getReportsByStatus called');
    return res.status(200).json({
        message: 'Successfully retrieved all reports by status'
    });
}
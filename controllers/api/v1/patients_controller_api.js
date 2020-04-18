const Patient = require('../../../models/patient');

module.exports.register = async function(req, res){
    console.log('patients_controller.register called');
    console.log('doctors_controller.register called');    
    try{
        let createdPatient = await Patient.create(req.body);
        if(createdPatient){
            return res.status(200).json({
                data: {
                    patient:createdPatient
                },
                message: 'Successfully registered patient'
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
    console.log('patients_controller.login called');
    return res.status(200).json({
        message: 'Successfully logged in patient'
    });
}

module.exports.createReport = function(req, res){
    console.log('patients_controller.createReport called');
    return res.status(200).json({
        message: 'Successfully created report'
    });
}

module.exports.getReports = function(req, res){
    console.log('patients_controller.getReports called');
    return res.status(200).json({
        message: 'Successfully retrieved all reports'
    });
}
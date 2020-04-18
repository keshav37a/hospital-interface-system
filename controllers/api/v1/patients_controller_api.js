module.exports.register = function(req, res){
    console.log('patients_controller.register called');
    return res.status(200).json({
        message: 'Successfully registered patient'
    });
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
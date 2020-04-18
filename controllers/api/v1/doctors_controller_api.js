module.exports.register = function(req, res){
    console.log('doctors_controller.register called');
    return res.status(200).json({
        message: 'Successfully registered doctor'
    });
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
const Doctor = require('../../../models/doctor');
const jwt = require('jsonwebtoken');
const cryptoObj = require('../../../config/crypto-js');

module.exports.register = async function(req, res){
    console.log('doctors_controller.register called');    

    //Encrypting the password of the doctor
    let password = req.body.password;
    console.log('password of dr: ', password);

    let encrPass = cryptoObj.encrypt(password);
    let decrPass = cryptoObj.decrypt(encrPass);

    console.log('decrPass', decrPass);
    req.body.password = encrPass;

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

module.exports.login = async function(req, res){
    console.log('doctors_controller.login called');

    let id = req.body.id;

    try{
        let doctor = await Doctor.findById(id);

        if(doctor){

            let pass = req.body.password;
            let pwdFromDb = doctor.password;
            pwdFromDb = cryptoObj.decrypt(pwdFromDb);

            console.log('passFromBody', pass );
            console.log('pwdFromDb', pwdFromDb);

            if(pass==pwdFromDb){
                return res.status(200).json({
                    data:{
                        token: jwt.sign(doctor.toJSON(), 'judgement-day', {expiresIn: 1000000})
                    },
                    message:'Here is your doctor token. Please keep it safe'
                })
            }
        }
        return res.status(401).json({
            message:'Invalid Credentials'
        });
    }
    catch(err){
        return res.status(500).json({
            message: `${err}`
        });
    }
}

module.exports.getReportsByStatus = function(req, res){
    console.log('doctors_controller.getReportsByStatus called');
    return res.status(200).json({
        message: 'Successfully retrieved all reports by status'
    });
}
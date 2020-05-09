const Doctor = require('../../../models/doctor');
const jwt = require('jsonwebtoken');
const cryptoObj = require('../../../config/crypto-js');

module.exports.register = async function(req, res){
    
    //Check to see if the doctor is already registered
    let reqPhone = req.body.phone;
    let doctorExists = await Doctor.findOne({phone: reqPhone});
    if(doctorExists){
        return res.status(405).json({
            message: 'Doctor with that Phone Number already registered'
        });
    }
            
    //Encrypting the password of the doctor
    let password = req.body.password;
    let encrPass = cryptoObj.encrypt(password);
    req.body.password = encrPass;

    try{
        let createdDoctor = await (await Doctor.create(req.body)).toObject();
        delete createdDoctor.password;
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
    let id = req.body.id;

    try{
        let doctor = await Doctor.findById(id);

        if(doctor){
            let pass = req.body.password;
            let pwdFromDb = doctor.password;
            pwdFromDb = cryptoObj.decrypt(pwdFromDb);

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


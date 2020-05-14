const Doctor = require('../../../models/doctor');
const jwt = require('jsonwebtoken');
const cryptoObj = require('../../../config/crypto-js');

module.exports.register = async function(req, res){

    //Check if all fields are present
    if(req.body.phone==undefined || req.body.name==undefined || req.body.password==undefined){
        return res.status(206).json({
            message: 'Incomplete data provided'
        });
    }
    
    //Check to see if the doctor is already registered
    let reqPhone = req.body.phone;
    let doctorExists = await Doctor.findOne({phone: reqPhone});
    if(doctorExists){
        doctorExists = await doctorExists.toObject();
        delete doctorExists.password;
        return res.status(405).json({
            data:{
                doctor: doctorExists
            },
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
    console.log('req.body:', req.body);
    if(req.body.id==undefined || req.body.password==undefined){
        return res.status(206).json({
            message: 'Incomplete data provided'
        });
    }

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
        console.log(err);
        return res.status(500).json({
            message: `${err}`
        });
    }
}

module.exports.retieveAllPatients = async (req, res)=>{
    let id = req.params.id;
    console.log('req.body:', req.body);
    if(req.body.id==undefined){
        return res.status(405).json({
            message: 'Unauthorized'
        });
    }

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
        console.log(err);
        return res.status(500).json({
            message: `${err}`
        });
    }
}
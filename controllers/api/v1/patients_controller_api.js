const Patient = require('../../../models/patient');
const Report = require('../../../models/report');
let Doctor = require('../../../models/doctor');
const enums = require('../../../config/statusEnums');

//Register a patient
module.exports.register = async function(req, res){
    console.log('patients_controller.register called');

    let phone = req.body.phone;

    //Checking if patient is already registered
    let patientToBeFound = await Patient.findOne({phone: phone});
    if(patientToBeFound){
        return res.status(200).json({
            data: patientToBeFound,
            message: 'Patient already registered'
        })
    }

    try{
        //Registering a new patient
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

//Create a new report
module.exports.createReport = async function(req, res){
    console.log('patients_controller.createReport called');

    // req.body.status = enums.status;
    console.log(req.body);
    console.log(req.params.id);

    let patientId = req.params.id;
    let doctorId = req.body.doctor;
    let status = req.body.status;

    //enums mapping has been done in config. Used to get the status from the number
    let st = req.body.status;
    req.body.status = enums[st];

    console.log(enums);

    try{
        let patient = await Patient.findById(patientId);
        let doctor = await Doctor.findById(doctorId);

        console.log(patient);
        console.log(doctor);

        //If the patient and doctor ids both exist only then report is created
        if(patient && doctor){
            let report = await Report.create(req.body);
            if(report){

                //pushing the new report in the patients reports array
                await patient.reports.push(report);
                await patient.save();
            }
            return res.status(200).json({
                data:{
                    patient: patient.name,
                    status: report.status,
                    doctor: doctor.name,
                    date: report.createdAt
                },
                message: 'Report generated successfully'
            })
        }
        else{
            return res.status(401).json({
                message: 'Patient/Doctor not registered'
            });
        }
    }
    catch(err){
        return res.status(500).json({
            message: err
        });
    }
}

//Get all reports of a patient 
module.exports.allReports = async function(req, res){
    console.log('patients_controller.getReports called');
    let patientId = req.params.id;

    try{
        //populating the reports array in patient 
        let patient = await (await Patient.findById(patientId)).
            populate({path: 'reports', populate: 'doctor patient'}).execPopulate();
        
        if(patient){
            let reports = patient.reports;
            let arr = [];
            reports.forEach(element=>{
                let obj = {};
                obj.patient = element.patient.name;
                obj.doctor = element.doctor.name;
                obj.status = element.status;
                obj.date = element.createdAt;
                arr.push(obj);
            })
            
            return res.status(200).json({
                data: arr,
                message: 'Reports retrieved successfully'
            });
        }
        else{
            return res.status(404).json({
                message: 'Patient not found'
            });
        }

    }
    catch(err){
        return res.status(500).json({
            message: err
        });
    }
}

//Get reports by status
module.exports.getReportsByStatus = async function(req, res){
    console.log('patients_controller.getReportsByStatus called');
    let prm = req.params.status;
    console.log(prm);
    let status = enums[prm];

    if(status==undefined){
        return res.status(404).json({
            message:'mapping to that status id has not been done'
        });
    }

    console.log('status', status);
    try{
        let reports = await Report.find({status: status}).populate('patient doctor');

        if(reports){
            let arr = [];
            reports.forEach(element=>{
                console.log(element);
                let obj = {};
                obj.patient = element.patient.name;
                obj.doctor = element.doctor.name;
                obj.status = element.status;
                obj.date = element.createdAt;
                arr.push(obj);
            })
            return res.status(200).json({
                data: arr,
                message: 'Reports retrieved successfully'
            });
        }
    }
    catch(err){
        return res.status(500).json({
            message: err
        });
    }
}
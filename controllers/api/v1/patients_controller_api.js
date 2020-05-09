const Patient = require('../../../models/patient');
const Report = require('../../../models/report');
let Doctor = require('../../../models/doctor');
const enums = require('../../../config/statusEnums');

//Register a patient
module.exports.register = async function(req, res){

    if(req.body.phone==undefined){
        return res.status(206).json({
            message: 'Incomplete data provided'
        });
    }

    let phone = req.body.phone;

    //Checking if patient is already registered
    let patientExists = await Patient.findOne({phone: phone});
    if(patientExists){
        return res.status(405).json({
            data:{
                patient:patientExists
            },
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

    let patientId = req.params.id;
    let doctorId = req.body.doctor;

    
    if(patientId==undefined || doctorId==undefined){
        return res.status(206).json({
            message: 'Incomplete data provided'
        });
    }

    //enums mapping has been done in config. Used to get the status from the number
    let st = req.body.status;
    req.body.status = enums[st];

    try{
        let patient = await Patient.findById(patientId);
        let doctor = await Doctor.findById(doctorId);

        //If the patient and doctor ids both exist only then report is created
        if(patient && doctor){
            req.body.patient = patientId;
            let report = await Report.create(req.body);
            if(report){
                //pushing the new report in the patients reports array
                await patient.reports.push(report);
                await patient.save();
            }
            return res.status(200).json({
                data:{
                    report:{
                        patient: patient.name,
                        status: report.status,
                        doctor: doctor.name,
                        date: report.createdAt
                    }
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
    let patientId = req.params.id;

    try{
        //populating the reports array in patient 
        let patient = await (await Patient.findById(patientId)).
            populate({path: 'reports', populate: 'doctor patient'}).execPopulate();

        if(patient){
            let reportsOfPatient = patient.reports;
            // reportsOfPatient.sort((a, b)=>{b.status-a.status});
            let reports = [];
            reportsOfPatient.forEach(element=>{
                let obj = {};
                obj.patient = element.patient.name;
                obj.doctor = element.doctor.name;
                obj.status = element.status;
                obj.date = element.createdAt;
                reports.push(obj);
            })
            
            return res.status(200).json({
                data: { 
                    reports: reports
                },
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
    let prm = req.params.status;
    let status = enums[prm];

    if(status==undefined){
        return res.status(404).json({
            message:'mapping to that status id has not been done'
        });
    }

    try{
        let reportsByStatus = await Report.find({status: status}).populate('patient doctor');

        if(reportsByStatus){
            let reports = [];
            reportsByStatus.forEach(element=>{
                let obj = {};
                obj.patient = element.patient.name;
                obj.doctor = element.doctor.name;
                obj.status = element.status;
                obj.date = element.createdAt;
                reports.push(obj);
            })
            return res.status(200).json({
                data: {reports},
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
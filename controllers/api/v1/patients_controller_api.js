const Patient = require('../../../models/patient');
const Report = require('../../../models/report');
const Doctor = require('../../../models/doctor');
const Stats = require('../../../models/stats');
const enums = require('../../../config/statusEnums');

//Register a patient
module.exports.register = async function(req, res){

    if(req.body.phone==undefined){
        return res.status(206).json({
            message: 'Incomplete data provided'
        });
    }

    

    let phone = req.body.phone;
    let doctorId = req.params.id;
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
        req.body.doctor = doctorId;
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

    console.log('req.params.id', req.params.id);
    console.log('req.body.doctor', req.body.doctor);
    
    if(patientId==undefined || doctorId==undefined){
        console.log('undefined');
        return res.status(206).json({
            message: 'Incomplete data provided'
        });
    }

    //enums mapping has been done in config. Used to get the status from the number
    let st = req.body.status;
    req.body.status = enums.enums[st];
    console.log('req.body.status', req.body.status);

    try{
        let patient = await Patient.findById(patientId).populate('reports');
        let doctor = await Doctor.findById(doctorId);

        //If the patient and doctor ids both exist only then report is created
        if(patient && doctor){
            req.body.patient = patientId;
            let report = await Report.create(req.body);
            console.log('report created');
            if(report){
                
                //If this is the first report then just create the report and push it to patient and push the patient in the patient array of stat schema
                let newStatus = req.body.status;

                let statStatusNew = enums.statsEnums[newStatus];

                //If no stats created
                let StatsForNewStatus = await Stats.findOne({status: statStatusNew});
                
                if(!StatsForNewStatus){
                    StatsForNewStatus = await Stats.create({status: statStatusNew});
                    console.log('StatsForNewStatus created', StatsForNewStatus);
                }
                
                //Finding out older reports of patient and taking out the latest status from them
                let patientReports = patient.reports;
                if(patientReports.length>0){
                    let olderReport = patientReports[patientReports.length-1];
                    console.log('olderReport', olderReport);
                    let oldStatus = olderReport.status;
                    console.log('oldStatus', oldStatus);   
                    //Further compact the enums to only positive negative and cured
                    let statStatusOld = enums.statsEnums[oldStatus];

                    //Find the stats for that old report and if it doesnt exist then create the stats
                    let StatsForOldStatus = await Stats.findOne({status: statStatusOld});
                    if(!StatsForOldStatus){
                        StatsForOldStatus = Stats.create({status: statStatusOld});
                        console.log('StatsForOldStatus created', StatsForOldStatus);
                    }

                    //Remove the patient from the patients array of old stat in stats schema 
                    console.log('statStatusOld', statStatusOld);
                    console.log('statStatusNew', statStatusNew);
                    StatsForOldStatus = await Stats.findOne({status: statStatusOld});
                    console.log('StatsForOldStatus', StatsForOldStatus);
                    let patientArrForOldStatus = StatsForOldStatus.patients;
                    patientArrForOldStatus.pull(patientId);
                    StatsForOldStatus.save();

                    // StatsForOldStatus = await Stats.update({status: statStatusOld}, {$pull: {patients: {$in:[`${patientId}`]}}});
                    console.log('StatsForOldStatus after updation', StatsForOldStatus);
                }

                //Add the patient to the patients array of new stat in stats schema 
                StatsForNewStatus = await Stats.findOne({status: statStatusNew});
                console.log('StatsForNewStatus', StatsForNewStatus);
                let patientArrForNewStatus = StatsForNewStatus.patients;
                patientArrForNewStatus.push(patientId);
                StatsForNewStatus.save();
                // StatsForNewStatus = await Stats.update({status: statStatusNew}, {$push: {patients: {$in:[`${patientId}`]}}});
                console.log('StatsForNewStatus after updation', StatsForNewStatus);
                
                //pushing the new report in the reports array of patients schema 
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
        console.log(err);
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
    let status = enums.enums[prm];

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
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const Doctor = require('../models/doctor');
const Patient = require('../models/patient');
const Report = require('../models/report');
const app = require('../index');

chai.use(chaiHttp);

let doctorsData = {};

let authToken = "";

var createdDoctorId = "";
let createdPatientId = "";

let baseUrl = 'http://localhost:8000'
let doctorsUrl = '/api/v1/doctors';
let patientsUrl = '/api/v1/patients';
 
doctorsData['baseUrl'] = baseUrl;
doctorsData['doctorsUrl'] = doctorsUrl;

//Params for register doctor post request
let doctorName = 'Doctor_Test';
let doctorPhone = '0123456789';
let password = 'password';

//Params for register patient post request
let patientName = "Patient_Test";
let patientPhone = "0987654321";


describe('Post - Doctor Calls', function() {

    it('Post - doctors/register', function(done) 
    {
        let call = "/register";

        chai.request(app)
            .post(doctorsUrl+call)
            .type('form')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({
                'name': doctorName,
                'phone': doctorPhone,
                'password': password
            })
            .end((err, body, response)=>{
                if(err){console.log(err);}

                let createdDoctor = body.body.data.doctor;
                createdDoctorId = createdDoctor._id;
                expect(body.status).to.equal(200);
                expect(createdDoctor).to.have.property('name');
                expect(createdDoctor).to.have.property('phone');
                expect((createdDoctorId.toString()).length).to.greaterThan(0);
                done();
            })
    });


    it('Post - doctors/login', function(done){
        let call = "/login";

        chai.request(app)
            .post(doctorsUrl+call)
            .type('form')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({
                'id': createdDoctorId,
                'password': password
            })
            .end((err, body, response)=>{
                if(err){console.log(err);}

                expect(body.status).to.equal(200);
                expect(body.body.data).to.have.property('token');
                authToken = body.body.data.token;
                expect(authToken.length).to.greaterThan(0);
                done();
            })

    });

    it('Post - patients/register', function(done){
        let call = '/register';

        chai.request(app)
            .post(patientsUrl+call)
            .type('form')
            .set('content-type', 'application/x-www-form-urlencoded')
            .set('Authorization', `Bearer ${authToken}`)
            .send({
                'name': patientName,
                'phone': patientPhone
            })
            .end((err, body, response)=>{
                if(err){console.log(err);}

                expect(body.status).to.equal(200);
                let createdPatient = body.body.data.patient;
                expect(createdPatient).to.have.property('_id');
                createdPatientId = createdPatient._id;
                expect(createdPatient).to.have.property('name');
                expect(createdPatient).to.have.property('phone');
                expect(createdPatient).to.have.property('createdAt');
                expect(createdPatientId.length).to.greaterThan(0);    
                done();
            })
    })

    it('Post - patients/:id/create_report', function(done){
        let call = '/create_report';
        let url = patientsUrl + '/' +  createdPatientId + call;

        let status = Math.floor(Math.random() * (3 - 0)); 

        chai.request(app)
            .post(url)
            .type('form')
            .set('content-type', 'application/x-www-form-urlencoded')
            .set('Authorization', `Bearer ${authToken}`)
            .send({
                'doctor': createdDoctorId,
                'status': status
            })
            .end((err, body, response)=>{
                if(err){console.log(err);}

                expect(body.status).to.equal(200);
                let report = body.body.data.report;
                status = report.status;
                expect(report).to.have.property('patient');
                expect(report).to.have.property('status');
                expect(report).to.have.property('doctor');
                expect(report).to.have.property('date');
                expect(status.length).to.above(0);
                done();
            })
        
    })

    it('Get - patients/:id/all_reports', function(done){
        let call = '/all_reports';
        let url = patientsUrl + '/' + createdPatientId + call;

        chai.request(app)
            .get(url)
            .set('content-type', 'application/x-www-form-urlencoded')
            .set('Authorization', `Bearer ${authToken}`)
            .end((err, body, response)=>{
                if(err){console.log(err);}

                expect(body.status).to.equal(200);
                let reports = body.body.data.reports;
                expect(reports).to.be.an('array');
                expect(reports[0]).to.have.property('patient');
                expect(reports[0]).to.have.property('status');
                expect(reports[0]).to.have.property('doctor');
                expect(reports[0]).to.have.property('date');
                expect(reports.length).to.greaterThan(0);
                done();
            })
    })

    after(async function() {
        let patient = await Patient.findById(createdPatientId);
        let reportId = patient.reports[0];
        let deletedReport = await Report.findByIdAndDelete(reportId);
        let deletedDoctor = await Doctor.findByIdAndDelete(createdDoctorId);
        patient.remove();
    });
});

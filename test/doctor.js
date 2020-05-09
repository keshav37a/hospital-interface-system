const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const axios = require('axios');
const Doctor = require('../models/doctor');
const Patient = require('../models/patient');
const Report = require('../models/report');
const db = require('../config/mongoose');

let doctorsData = {};

let bearer = "Bearer ";
let authToken = "";
var headers = {};

var createdDoctorId = "";
let createdPatientId = "";

let baseUrl = 'http://localhost:8000/api/v1'
let doctorsUrl = '/doctors';
let patientsUrl = '/patients';
 
doctorsData['baseUrl'] = baseUrl;
doctorsData['doctorsUrl'] = doctorsUrl;

//Params for post request
let doctorName = 'Doctor_Test';
let doctorPhone = '0123456789';
let password = 'password';

//Params for post request for patient
let patientName = "Patient_Test";
let patientPhone = "0987654321";


describe('Post - Doctor Calls', function() {

    it('Post - Doctor - Register', async function() 
    {
        let call = "/register";
        let url = baseUrl+doctorsUrl+call;

        const params = new URLSearchParams();
        params.append('name', doctorName);
        params.append('phone', doctorPhone);
        params.append('password', password);

        let response = await axios.post(url, params);
        let createdDoctor = response.data.data.doctor;
        createdDoctorId = createdDoctor._id;
        doctorsData['createdDoctorId'] = createdDoctorId;

        expect(response.status).to.equal(200);
        expect(createdDoctor).to.have.property('name');
        expect(createdDoctor).to.have.property('phone');
        expect((createdDoctorId.toString()).length).to.greaterThan(0);
    });


    it('Post - Doctor - Login', async function(){
        let call = "/login";
        let url = baseUrl+doctorsUrl+call;
        const params = new URLSearchParams();

        params.append('id', createdDoctorId);
        params.append('password', password);

        let response = await axios.post(url, params);
        expect(response.status).to.equal(200);
        expect(response.data.data).to.have.property('token');
        authToken = response.data.data.token;
        expect(authToken.length).to.greaterThan(0);
    });

    it('Post - Patient - Register', async function(){
        let call = '/register';
        let url = baseUrl+patientsUrl+call;

        const params = new URLSearchParams();
        params.append('name', patientName);
        params.append('phone', patientPhone);
        
        headers['Authorization'] = bearer + authToken;
        doctorsData['headers'] = headers;

        let response = await axios.post(url, params, {headers: headers});
        expect(response.status).to.equal(200);
        console.log(response.data);
        let createdPatient = response.data.data.patient;
        createdPatientId = createdPatient._id;
        expect(createdPatient).to.have.property('name');
        expect(createdPatient).to.have.property('phone');
        expect(createdPatient).to.have.property('createdAt');
        expect(createdPatientId.length).to.greaterThan(0);
    })

    it('Post - Create new Report for a patient', async function(){
        let call = '/create_report';
        let url = baseUrl + patientsUrl + '/' +  createdPatientId + call;

        const params = new URLSearchParams();
        let status = Math.floor(Math.random() * (3 - 0)); 

        params.append('doctor', createdDoctorId);
        params.append('status', status);
        
        let response = await axios.post(url, params, {headers: headers});
        expect(response.status).to.equal(200);
        let report = response.data.data.report;
        status = report.status;
        expect(report).to.have.property('patient');
        expect(report).to.have.property('status');
        expect(report).to.have.property('doctor');
        expect(report).to.have.property('date');
        expect(status.length).to.above(0);
    })

    it('Get - fetch all reports of a patient', async function(){
        let call = '/all_reports';
        let url = baseUrl + patientsUrl + '/' + createdPatientId + call;
        let response = await axios.get(url, {headers:headers});
        expect(response.status).to.equal(200);
        let reports = response.data.data.reports;

        expect(reports).to.be.an('array');
        expect(reports[0]).to.have.property('patient');
        expect(reports[0]).to.have.property('status');
        expect(reports[0]).to.have.property('doctor');
        expect(reports[0]).to.have.property('date');
        expect(reports.length).to.greaterThan(0);
    })

    after(async function() {
        let patient = await Patient.findById(createdPatientId);
        let reportId = patient.reports[0];
        let deletedReport = await Report.findByIdAndDelete(reportId);
        let deletedDoctor = await Doctor.findByIdAndDelete(createdDoctorId);
        patient.remove();
    });
});

const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const axios = require('axios');
const request = require('request');
const Doctor = require('../models/doctor');
const Patient = require('../models/patient');


describe('Doctor Calls', async function() {
    // Further code for tests goes here
    let bearer = "Bearer ";
    let authToken = "";
    let headers = {};

    let createdDoctorId = "";
    let createdPatientId = "";

    let baseUrl = 'http://localhost:8000/api/v1'
    let doctorsUrl = '/doctors';
    let patientsUrl = '/patients';

    //Params for post request
    let doctorName = 'Doctor_Test';
    let doctorPhone = '0123456789';
    let password = 'password';

    //Params for post request for patient
    let patientName = "Patient_Test";
    let patientPhone = "0987654321";

    it('Doctor - Register', function(done) 
    {
        let call = "/register";

        const params = new URLSearchParams();
        params.append('name', doctorName);
        params.append('phone', doctorPhone);
        params.append('password', password);

        axios.post(baseUrl+doctorsUrl+call, params).then(function (response) {
            // console.log(response.data);
            createdDoctorId = response.data.data.doctor._id;
            expect((createdDoctorId.toString()).length).to.greaterThan(0);
            done();
        });

    });


    it('Doctor - Login', function(done) 
    {
        let call = "/login";
        const params = new URLSearchParams();

        params.append('id', createdDoctorId);
        params.append('password', password);

        axios.post(baseUrl+doctorsUrl+call, params).then(function (response) {
            authToken = response.data.data.token;
            expect((authToken.toString()).length).to.greaterThan(0);
            done();
        });
    });

    it('Patient - Register', function(done){
        let call = '/register';
        const params = new URLSearchParams();
        
        params.append('name', patientName);
        params.append('phone', patientPhone);
        
        headers['Authorization'] = bearer + authToken;

        axios.post(baseUrl+patientsUrl+call, params, {headers: headers}).then(function (response) {
            createdPatientId = response.data.data.patient._id;
            expect((createdPatientId.toString()).length).to.greaterThan(0);
            done();        
        })
    })

    it('Create new Report for a patient', function(done){
        let call = '/create_report';
        let url = baseUrl + patientsUrl + '/' +  createdPatientId + call;

        const params = new URLSearchParams();
    
        let status = Math.floor(Math.random() * (3 - 0)); 
        console.log(status);

        params.append('doctor', createdDoctorId);
        params.append('status', status);

        axios.post(url, params, {headers: headers}).then(function(response){
            let status = response.data.data.status;
            expect((status.toString()).length).to.greaterThan(0);
            done();
        })
    })

    it('fetch all reports of a patient', function(done){
        let call = '/all_reports';
        let url = baseUrl + patientsUrl + '/' + createdPatientId + call;
        axios.get(url, {headers:headers}).then(function(response){
            let reports = response.data.data.reports;
            expect(reports.length).to.greaterThan(0);
            done();
        })
    })

});


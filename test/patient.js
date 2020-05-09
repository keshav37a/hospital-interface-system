const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const axios = require('axios');
const request = require('request');
const Doctor = require('../models/doctor');

const doctorTest = require('./doctor');
console.log('doctorTest.authCode', doctorTest);


// describe('Doctor Calls', async function() {
//     // Further code for tests goes here
//     console.log('doctorTest.authCode', doctorTest);
//     // let baseUrl = 'http://localhost:8000/api/v1/patients'
//     // //Params for post request
//     // let name = 'Patient_Test';
//     // let phone = '0123456789';

//     // it('Patient-Register - should return a created doctor object', function(done) 
//     // {
//     //     let call = "/register";

//     //     const params = new URLSearchParams();
//     //     params.append('name', name);
//     //     params.append('phone', phone);

//     //     axios.post(baseUrl+call, params).then(function (response) {
//     //         console.log(response.data);
//     //         createdDoctorId = response.data.data.doctor._id;
//     //         expect((createdDoctorId.toString()).length).to.greaterThan(0);
//     //         done();
//     //     });

//     // });
//   });


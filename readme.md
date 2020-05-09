# Hospital System API

## Dependencies needed to install

To install any dependency required, Navigate to the project directory, open the terminal and run the command `npm install <dependency_name>`.\
For example `npm install express`

The following dependencies need to be installed before running the project

* express
* nodemon
* mongoose
* passport
* passport-jwt
* crypto-js
* jsonwebtoken
* mocha
* chai

## Running the project

To run the project open the terminal and run the command `npm start`

## Testing the project

After the project has successfully run, In a web browser you can run the following urls to get the data

* Register Doctor\
  Post Request: `http://localhost:8000/api/v1/doctors/register`\
  Pass the name, phone and password values in the body for this route and this will return the newly registered doctor details.

* Doctor Login\
  Post Request: `http://localhost:8000/api/v1/doctors/login`\
  Pass the (doctor's)id and password values in the body and if validated then  this will return the jwt-token which can be used for further routes which require authorization.

* Register Patient\
  Post Request: `http://localhost:8000/api/v1/patients/register`\
  Pass the (patient's)name and (patient's)phone in the body along with the jwt-token in the header and if validated then this will register the patient and return the registered patient details.

* Create Report\
  Post Request: `http://localhost:8000/api/v1/patients/:id/create_report`\
  Pass the doctor(id) and status in the body along with the jwt-token in the headers and the patient id in the url and if validated then this will create the report for the patient and return the newly created report

* Get All Reports of a patient\
  Get Request: `http://localhost:8000/api/v1/patients/:id/all_reports`\
  Pass the patient id in the url along with the jwt-token in the headers and if validated then this will retireve all the reports for that patient from oldest to latest.

* Get Reports by Status\
  Get Request: `http://localhost:8000/api/v1/reports/:status`\
  Pass the status in the url along with the jwt-token in the headers and if validated then this will retireve all the reports for all the patients for that specific status.

## Unit Tests

Tests for 5 routes have been written

* Post - Docto - Register
* Post - Doctor - Login
* Post - Patient - Register
* Post - Create new Report for a patient
* Get - fetch all reports of a patient

To test the api, open the terminal in split mode.
Type `npm start` in one terminal and run.
Type `npm test` in the other terminal and run.
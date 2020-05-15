import axios from 'axios';

export default {
  getAllReportsOfPatient: async () => {
    let res = await axios.get(`/api/v1/patients/5ebd4f9b15607a5388fb4643/all_reports`);
    return res.data || [];
  },

  getAllPatientsOfADoctor: async (doctorId, authToken) =>{
    let res = await axios.get(`/api/v1/doctors/${doctorId}/all_patients`, {Headers: {Authorization: `Bearer ${authToken}`} });
    let patients = res.data.data.patients;
    return patients;
  },

  doctorSignIn: async (doctorId, password) =>{
    const body={id: doctorId, password: password};
    let res = await axios.post('/api/v1/doctors/login', body);
    const signInData = {};
    if(res.status==200){
      console.log('Successfully logged in');
      let resDoctor = await axios.get(`/api/v1/doctors/${doctorId}`);
      let doctor = resDoctor.data.data;
      console.log(doctor);
      let token = res.data.data.token;
      console.log(token);
      signInData['isSignedIn'] = true;
      signInData['token'] = token;
      signInData['doctor'] = doctor;
    }
    else{
      signInData['isSignedIn'] = false;
      console.log('Invalid username password');
    }
    return signInData;
  },

  // addReport(this.doctor._id, this.state.status, this.state.authToken, this.state.patientId);    

  addReport: async (doctorId, status, authToken, patientId)=>{
    let body = {doctor:doctorId, status: status};
    let tokenStr = 'Bearer ' + authToken;
    let res = await axios.post(`/api/v1/patients/${patientId}/create_report`, body, {headers: {'Authorization': tokenStr}});
  }
}

// http://localhost:8000/api/v1/patients/5ebd4f9b15607a5388fb4643/all_reports
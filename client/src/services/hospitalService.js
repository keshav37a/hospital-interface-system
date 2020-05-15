import axios from 'axios';

export default {
  getAllReportsOfPatient: async () => {
    let res = await axios.get(`/api/v1/patients/5ebd4f9b15607a5388fb4643/all_reports`);
    return res.data || [];
  },

  getAllPatientsOfADoctor: async (doctorId, authToken) =>{
    // http://localhost:8000/api/v1/doctors/:id/all_patients
    let res = await axios.get(`/api/v1/doctors/${doctorId}/all_patients`, {Headers: {Authorization: `Bearer ${authToken}`} });
    let patients = res.data.data.patients;
    return patients;
  },

  doctorSignIn: async (doctorId, password) =>{
    console.log('in doctorSignIn', doctorId, password);
    const body={id: doctorId, password: password};
    let res = await axios.post('/api/v1/doctors/login', body);
    console.log(res);
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
  }
}

// http://localhost:8000/api/v1/patients/5ebd4f9b15607a5388fb4643/all_reports
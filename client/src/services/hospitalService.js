import axios from 'axios';

export default {
  getAllReportsOfPatient: async () => {
    let res = await axios.get(`/api/v1/patients/5ebd4f9b15607a5388fb4643/all_reports`);
    return res.data || [];
  },

  doctorSignIn: async (doctorId, password) =>{
    console.log('in doctorSignIn', doctorId, password);
    const body={id: doctorId, password: password};
    let res = await axios.post('/api/v1/doctors/login', body);
    console.log(res);
    const signInData = {};
    if(res.status==200){
      console.log('Successfully logged in');
      let token = res.data.data.token;
      console.log(token);
      signInData['isSignedIn'] = true;
      signInData['token'] = token;
    }
    else{
      signInData['isSignedIn'] = false;
      console.log('Invalid username password');
    }
    return signInData;
  }
}

// http://localhost:8000/api/v1/patients/5ebd4f9b15607a5388fb4643/all_reports
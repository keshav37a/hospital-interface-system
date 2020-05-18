import axios from 'axios';

export default {
  getAllReportsOfPatient: async (authToken) => {
    try{
      let tokenStr = "Bearer " + authToken;
      let res = await axios.get(`/api/v1/patients/5ebd4f9b15607a5388fb4643/all_reports`, {headers:{Authorization: tokenStr}});
      return res.data || [];
    }
    catch(err){
      console.log(err);
      return 500;
    }
  },

  getAllPatientsOfADoctor: async (doctorId, authToken) =>{
    try{
      let res = await axios.get(`/api/v1/doctors/${doctorId}/all_patients`, {headers: {Authorization: `Bearer ${authToken}`} });
      let patients = res.data.data.patients;
      return patients;
    }
    catch(err){
      console.log(err);
      return [];
    }
    
  },

  doctorSignIn: async (doctorId, password) =>{
    try{
      const signInData = {};
      const body={id: doctorId, password: password};
      let res = await axios.post('/api/v1/doctors/login', body);
  
      if(res.status==200){
        console.log('Successfully logged in');
        let authToken = res.data.data.token
        let tokenStr = 'Bearer ' + authToken;
        console.log(doctorId);
        let resDoctor = await axios.get(`/api/v1/doctors/${doctorId}`, {headers: {Authorization: tokenStr}});
        console.log(resDoctor);
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
    catch(err){
      console.log(err);
      const signInData = {};
      signInData['isSignedIn'] = false;
      return signInData;
    }
  },

  addReport: async (doctorId, status, authToken, patientId)=>{
    try{
      let body = {doctor:doctorId, status: status};
      let tokenStr = 'Bearer ' + authToken;
      let res = await axios.post(`/api/v1/patients/${patientId}/create_report`, body, {headers: {'Authorization': tokenStr}});
      return res.status;
    }
    catch(err){
      console.log(err);
      return 500;
    }
    
  },

  addPatient: async(doctorId, patientName, patientPhone, authToken)=>{
    let body = {name:patientName, phone: patientPhone};
    let tokenStr = 'Bearer ' + authToken;
    let res = await axios.post(`/api/v1/patients/${doctorId}/register`, body, {headers: {'Authorization': tokenStr}});
    console.log(res);
    return res.status;
  },

  addDoctor: async(doctorName, doctorPhone, doctorPassword) =>{
    try{
      let body = {name: doctorName, phone: doctorPhone, password: doctorPassword};
      let res = await axios.post('/api/v1/doctors/register', body);
      return res.status;
    }
    catch(err){
      return 500;
    }
  },

  getStats: async(doctorId, authToken)=>{
    try{
      let tokenStr = 'Bearer ' + authToken;
      let res = await axios.get(`/api/v1/doctors/${doctorId}/all_stats`, {headers: {'Authorization': tokenStr}});
      return res.data.data.stats;
    }
    catch(err){
      console.log(err);
      return [];
    }
  }
}

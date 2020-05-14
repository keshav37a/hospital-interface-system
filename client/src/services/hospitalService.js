import axios from 'axios';

export default {
  getAllReportsOfPatient: async () => {
    console.log('getAllReportsOfPatient called in hospital service');
    let res = await axios.get(`/api/v1/patients/5ebd4f9b15607a5388fb4643/all_reports`);
    return res.data || [];
  }
}

// http://localhost:8000/api/v1/patients/5ebd4f9b15607a5388fb4643/all_reports
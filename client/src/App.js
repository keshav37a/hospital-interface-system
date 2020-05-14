import React from 'react';
import './App.css';
import hospitalService from './services/hospitalService';

class App extends React.Component{

  state = {
    reports:[]
  };

  componentDidMount(){
    this.getReports();
  }

  getReports = async () => {
    console.log('getReports called in App.js');
    let res = await hospitalService.getAllReportsOfPatient();
    console.log(res);
    this.setState({
      reports: res.data.reports,
      loading: false
    });
  }

  render(){
    return(
      this.state.reports.map((report)=>{
        return(
          <div>
          <div>name: {report.patient}</div>
          <div>doctor: {report.doctor}</div>
          <div>status: {report.status}</div>
          <div>date: {report.date}</div>
        </div>
        )
      })
    )
  }

}

export default App;

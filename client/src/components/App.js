import React from 'react';
import '../styles/App.scss'
import hospitalService from '../services/hospitalService';
import Report from './report';
import SignIn from './signIn';

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
      <div>
        <div><SignIn/></div>
      </div>
    )
  }

}

export default App;

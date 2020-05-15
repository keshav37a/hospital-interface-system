import React from 'react';
import '../styles/stats.scss';
import HospitalService from '../services/hospitalService';

class Stats extends React.Component{

  constructor(props){
    super(props);
    this.doctor = props.location.state.doctor;
    this.authToken = props.location.state.token;
    this.stats = [];

    this.state = {doctor: this.doctor, authToken: this.authToken, stats: this.stats};

    console.log(this.doctor);
    console.log(this.authToken);
  }

  componentDidMount(){
      this.getStats();
  }

  getStats = async()=>{
    console.log(this.doctor.doctor._id);
    let stats = await  HospitalService.getStats(this.doctor.doctor._id, this.state.authToken);
    console.log(stats);
    this.setState({stats: stats});
    console.log(this.state);
  }

  render(){
    let stats = this.state.stats;
    console.log('render');
    console.log(stats);
    return(
      <div>
        <div>Stats Page</div>
        {stats.map((stat)=>{
            return(
                <div>
                    <div className="header-stats">{stat.status}</div>
                    <div className="body">
                        {stat.patients.map((patient)=>{
                            return(
                                <div className="container">
                                    <div className="single-patient-container">
                                        <div className="labels-container-stats">
                                            <div className="labels">
                                                <div>Patient's Name:</div>
                                                <div>Patient's Id:</div>
                                                <div>Phone: </div>
                                                <div>Check Up Date: </div>
                                            </div>
                                            <div className="labels">
                                                <div>{patient.name}</div>
                                                <div>{patient._id}</div>
                                                <div>{patient.phone}</div>
                                                <div>{patient.createdAt}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )
        })}
      </div>
    )
  }

}

export default Stats;

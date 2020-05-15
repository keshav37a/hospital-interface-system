import React from 'react';
import '../styles/stats.scss';
import HospitalService from '../services/hospitalService';
import {Pie} from 'react-chartjs-2';

class Stats extends React.Component{

  constructor(props){
    super(props);
    this.doctor = props.location.state.doctor;
    this.authToken = props.location.state.token;
    this.stats = [];

    this.state = 
    {
                  doctor: this.doctor, 
                  authToken: this.authToken, 
                  stats: this.stats,
                  labels: [],
                  datasets: [
                    {
                      label: 'Corona Cases',
                      backgroundColor: ['#B21F00', '#C9DE00', '#2FDE00', '#00A6B4'],
                      hoverBackgroundColor: ['#501800', '#4B5000', '#175000', '#003350'],
                      data: []
                    }
                  ]

    };

    console.log(this.doctor);
    console.log(this.authToken);
  }

  componentDidMount(){
      this.getStats();
  }

  getStats = async()=>{
    let stats = await  HospitalService.getStats(this.doctor.doctor._id, this.state.authToken);

    let labels = [];
    let data = [];

    stats.map((el)=>{
        labels.push(el.status);
        data.push(el.patients.length);
    })

    let datasets = this.state.datasets;
    datasets[0].data = data;
    this.setState({stats: stats, labels: labels, datasets:datasets});
  }

  render(){
    let stats = this.state.stats;
    return(
      <div>
        <div>Stats Page</div>
        <div>
            <Pie data={this.state}
                 options={{
                    title:{
                      display:true,
                      text:'Corona Status',
                      fontSize:20
                    },
                    legend:{
                      display:true,
                      position:'right'
                    }
                  }}
            />
        </div>
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

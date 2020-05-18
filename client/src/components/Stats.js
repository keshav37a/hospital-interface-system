import '../styles/stats.scss';
import React, { useState, useEffect } from 'react';
import HospitalService from '../services/hospitalService';
import {Pie} from 'react-chartjs-2';

const Stats = (props)=>{
  const doctor = props.location.state.doctor;
  const authToken = props.location.state.token;
  const [stats, setStats] = useState([]);
  const [changeVar, setChangeVar] = useState(0);
  
  const chartData = {
    labels: [],
    datasets : [
      {
        label: 'Corona Statistics',
        backgroundColor: [
          '#B21F00',
          '#6800B4',
          '#2FDE00'
        ],
        hoverBackgroundColor: [
        '#501800',
        '#35014F',
        '#175000',
        ],
        data: []
      }
    ]
  }

  const getStats = async()=>{
    let stats = await  HospitalService.getStats(doctor.doctor._id, authToken);
    let labels = [];
    let data = [];

    stats.map((el)=>{
        labels.push(el.status);
        data.push(el.patients.length);
    })
    chartData.datasets[0].data = data;
    chartData.labels = labels;
    setStats(stats);
    console.log(stats);
  }

  useEffect(()=>{
    getStats();
  },[changeVar]);
  
  return(
    <div>
      <div>Stats Page</div>
      <div>
          <Pie data={chartData}
               options={{
                  title:{
                    display:true,
                    text:'Corona Status',
                    fontSize:20
                  },
                  legend:{
                    display:true,
                    position:'right'
                  },
                  responsive:true,
                  maintainAspectRatio: true
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

export default Stats;

import React from 'react';
import HospitalService from '../services/hospitalService';
import '../styles/patient.scss'

class Patient extends React.Component{
    
    doctorId = '';
    authToken = '';
    isSignedIn = '';
    doctor = {};
    patients = [];

    state = {authToken: this.authToken, isSignedIn: this.isSignedIn, patients: this.patients, doctor: this.doctor};

    constructor(props){
        super();

        this.doctorId = props.location.state.id;
        this.authToken = props.location.state.signInData.token;
        this.isSignedIn = props.location.state.signInData.isSignedIn;
        this.doctor = props.location.state.signInData.doctor;
    }

    componentDidMount(){
        this.getPatientsList();
    }

    getPatientsList = async ()=>{
        let patients = await HospitalService.getAllPatientsOfADoctor(this.doctorId, this.authToken);
        this.setState({authToken: this.authToken, isSignedIn: this.isSignedIn, patients: patients, doctor: this.doctor});
        console.log(this.state);
    }

    render(){
        let patients = this.state.patients;
        return(
            <div className="patients-container">
                {patients.map((patient)=>{
                    return(
                        <div className="single-patient-container">
                            <div className="labels-container">
                                <div className="labels">
                                    <div>Patient's Name:</div>
                                    <div>Patient's Id:</div>
                                    <div>Phone: </div>
                                </div>
                                <div className="labels">
                                    <div>{patient.name}</div>
                                    <div>{patient._id}</div>
                                    <div>{patient.phone}</div>
                                </div>
                            </div>
                            
                            <div className="reports-container">
                                {patient.reports.map((report)=>{
                                    return(
                                        <div className="single-report-container">
                                            <div>{report.status}</div>
                                            <div>{report.createdAt}</div>
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

export default Patient;
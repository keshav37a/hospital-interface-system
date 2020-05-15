import React from 'react';
import HospitalService from '../services/hospitalService';
import '../styles/patient.scss'
import { Redirect } from 'react-router';
import moment from 'moment';

class Patient extends React.Component{
    
    doctorId = '';
    authToken = '';
    isSignedIn = '';
    doctor = {};
    patients = [];
    status = 0;
    patientId = '';
    newPatientName = '';
    newPatientPhone = '';
    redirect = false;

    state = {authToken: this.authToken, 
             isSignedIn: this.isSignedIn, 
             patients: this.patients, 
             doctor: this.doctor, 
             status: this.status, 
             patientId: this.patientId,
             doctorId: this.doctorId,
             newPatientName: this.newPatientName,
             newPatientPhone: this.newPatientPhone,
             redirect: false};

    constructor(props){
        super();

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeDropdown = this.handleChangeDropdown.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangePhone = this.handleChangePhone.bind(this);
        this.handleSubmitAddPatient = this.handleSubmitAddPatient.bind(this);
        this.handleNavigateStats = this.handleNavigateStats.bind(this);

        this.doctorId = props.location.state.id;
        this.authToken = props.location.state.signInData.token;
        this.isSignedIn = props.location.state.signInData.isSignedIn;
        this.doctor = props.location.state.signInData.doctor;
    }

    componentDidMount(){
        this.getPatientsList();
    }

    componentDidUpdate(){
        this.getPatientsList();
    }

    getPatientsList = async ()=>{
        let patients = await HospitalService.getAllPatientsOfADoctor(this.doctorId, this.authToken);
        this.setState({authToken: this.authToken, 
                       isSignedIn: this.isSignedIn, 
                       patients: patients, 
                       doctor: this.doctor,
                       doctorId: this.doctorId
                       });
    }

    handleChangeDropdown(event) {
        const selectedIndex = event.target[event.target.selectedIndex].getAttribute('data-key');
        let status = selectedIndex;
        console.log(selectedIndex);
        let patientId = event.target.value;
        this.setState({status: status, patientId: patientId});
    }

    async handleSubmit(event) {
        event.preventDefault();
        await HospitalService.addReport(this.state.doctorId, 
                                        this.state.status, 
                                        this.state.authToken, 
                                        this.state.patientId);
        this.componentDidUpdate();
    }

    async handleSubmitAddPatient(event){
        event.preventDefault();
        let res = await HospitalService.addPatient(this.state.doctorId, 
                                                   this.state.newPatientName, 
                                                   this.state.newPatientPhone, 
                                                   this.state.authToken);
        this.componentDidUpdate();
    }

    handleChangeName(event){
        this.setState({newPatientName: event.target.value});
    }

    handleChangePhone(event){
        this.setState({newPatientPhone: event.target.value});
        
    }

    handleNavigateStats(event){
        event.preventDefault();
        this.setState({redirect:true});
        this.componentDidUpdate();
    }

    render(){

        if(this.state.redirect) {
            return <Redirect to={{
                pathname: '/stats',
                state: { doctor: this.state.doctor, token: this.state.authToken}
            }}/>
        }

        let patients = this.state.patients;
        return(
            <div className="patients-container">
                <div className="stats" onClick={this.handleNavigateStats}>Stats</div>
                <div className="header">Add Patient</div>
                <div className="add-patient-container">
                    <div><input type="text" placeholder="Patient Name" onChange={this.handleChangeName}></input></div>
                    <div><input type="number" placeholder="Phone Number" onChange={this.handleChangePhone}></input></div>
                    <div><input className="submit-btn" type="submit" placeholder="Patient Name" onClick={this.handleSubmitAddPatient}></input></div>
                </div>
                {patients.map((patient)=>{
                    return(
                        <div className="container">
                            <div className="single-patient-container">
                                <div className="header">Patient Details</div>
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
                                <div className="header">Reports</div>
                                <div className="reports-container">
                                    {patient.reports.map((report)=>{
                                        return(
                                            <div className="single-report-container">
                                                <div>{report.status}</div>
                                                <div>{moment(report.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className="add-report-container">
                                <div className="header">Add Report</div>
                                <div className="flexRow">
                                    <div className="dropdown">
                                        <select onChange={this.handleChangeDropdown}>
                                            <option data-key="-1">Select Status</option>
                                            <option data-key="0" value={patient._id}>Negative</option>
                                            <option data-key="1" value={patient._id}>Travelled-Quarantine</option>
                                            <option data-key="2" value={patient._id}>Symptoms-Quarantine</option>
                                            <option data-key="3" value={patient._id}>Positive-Admit</option>
                                            <option data-key="4" value={patient._id}>Cured</option>
                                        </select>
                                    </div>
                                    <div>
                                        <button className="submit-btn" onClick={this.handleSubmit}>Generate Report</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default Patient;


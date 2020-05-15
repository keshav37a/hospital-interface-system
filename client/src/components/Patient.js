import React from 'react';
import HospitalService from '../services/hospitalService';
import '../styles/patient.scss'

class Patient extends React.Component{
    
    doctorId = '';
    authToken = '';
    isSignedIn = '';
    doctor = {};
    patients = [];
    status = 0;
    patientId = '';

    state = {authToken: this.authToken, 
             isSignedIn: this.isSignedIn, 
             patients: this.patients, 
             doctor: this.doctor, 
             status: this.status, 
             patientId: this.patientId,
             doctorId: this.doctorId};

    constructor(props){
        super();

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeDropdown = this.handleChangeDropdown.bind(this);

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
        const selectedIndex = event.target.options.selectedIndex;
        let status = selectedIndex;
        let patientId = event.target.value;
        this.setState({status: status, patientId: patientId});
    }

    async handleSubmit(event) {
        event.preventDefault();
        let status = this.state.status;
        let res = await HospitalService.addReport(this.state.doctorId, this.state.status, this.state.authToken, this.state.patientId);
        this.componentDidUpdate();
    }

    render(){
        let patients = this.state.patients;
        return(
            <div className="patients-container">
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
                                                <div>{report.createdAt}</div>
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
                                            <option data-key="0" value={patient._id}>Negative</option>
                                            <option data-key="1" value={patient._id}>Travelled-Quarantine</option>
                                            <option data-key="2" value={patient._id}>Symptoms-Quarantine</option>
                                            <option data-key="3" value={patient._id}>Positive-Admit</option>
                                        </select>
                                    </div>
                                    <div className="submit-btn">
                                        <button onClick={this.handleSubmit}>Submit</button>
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
import React, {useState, useEffect} from 'react';
import HospitalService from '../services/hospitalService';
import '../styles/patient.scss'
import history from '../services/historyService';
import { useToasts } from 'react-toast-notifications';
import moment from 'moment';

const Patient = (props)=>{

    let doctorId = '';
    let authToken = '';
    let isSignedIn = '';
    let doctor = {};

    const { addToast } = useToasts();

    const showNotifs = (reqStatus, message) =>{
        if(reqStatus==200)
            addToast(message, { appearance: 'success', autoDismiss:true,  autoDismissTimeout: 3000});
        else
            addToast('Internal Server Error', { appearance: 'error', autoDismiss:true,  autoDismissTimeout: 3000});
    }

    if(props.location.state===undefined){
        history.push('/unauthorized');
    }

    else{
        doctorId = props.location.state.id;
        authToken = props.location.state.signInData.token;
        isSignedIn = props.location.state.signInData.isSignedIn;
        doctor = props.location.state.signInData.doctor;
    }
    
    const [patients, setPatients] = useState([]); 
    const [status, setStatus] = useState(0);
    const [patientId, setPatientId] = useState('');
    const [newPatientName, setNewPatientName] = useState('');
    const [newPatientPhone, setNewPatientPhone] = useState('');
    const [changeVar, setChangeVar] = useState(0);

    useEffect(()=>{
        getPatientsList();
    },[changeVar]);

    const getPatientsList = async ()=>{
        let patients = await HospitalService.getAllPatientsOfADoctor(doctorId, authToken);
        console.log(patients);
        setPatients(patients);
    }

    const handleChangeDropdown = (event)=>{
        const selectedIndex = event.target[event.target.selectedIndex].getAttribute('data-key');
        let status = selectedIndex;
        console.log(selectedIndex);
        let patientId = event.target.value;
        setStatus(status);
        setPatientId(patientId);
    }

    const handleSubmit = async (event) =>  {
        event.preventDefault();
        let reqStatus = await HospitalService.addReport(doctorId, status, authToken, patientId);
        showNotifs(reqStatus, 'Report Added');
        setChangeVar(changeVar+1);
    }

    const handleSubmitAddPatient = async(event)=>{
        event.preventDefault();
        let reqStatus = await HospitalService.addPatient(doctorId, newPatientName, newPatientPhone, authToken);
        showNotifs(reqStatus, 'Patient Added');
        setChangeVar(changeVar+1);
    }

    const handleChangeName = (event)=>{
        setNewPatientName(event.target.value);
    }

    const handleChangePhone = (event)=>{
        setNewPatientPhone(event.target.value);
    }

    const handleNavigateStats = (event)=>{
        history.push('/stats', { doctor: doctor, token: authToken});
    }
    
    return(
        <div className="patients-container">
            <div className="stats" onClick={handleNavigateStats}>Stats</div>
            <div className="header">Add Patient</div>
            <div className="add-patient-container">
                <div><input type="text" placeholder="Patient Name" onChange={handleChangeName}></input></div>
                <div><input type="number" placeholder="Phone Number" onChange={handleChangePhone}></input></div>
                <div><input className="submit-btn" type="submit" placeholder="Patient Name" onClick={handleSubmitAddPatient}></input></div>
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
                                            <div>{moment(report.createdAt).format('MMMM Do YYYY, h:mm:a')}</div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="add-report-container">
                            <div className="header">Add Report</div>
                            <div className="flexRow">
                                <div className="dropdown">
                                    <select onChange={handleChangeDropdown}>
                                        <option data-key="-1">Select Status</option>
                                        <option data-key="0" value={patient._id}>Negative</option>
                                        <option data-key="1" value={patient._id}>Travelled-Quarantine</option>
                                        <option data-key="2" value={patient._id}>Symptoms-Quarantine</option>
                                        <option data-key="3" value={patient._id}>Positive-Admit</option>
                                        <option data-key="4" value={patient._id}>Cured</option>
                                    </select>
                                </div>
                                <div>
                                    <button className="submit-btn" onClick={handleSubmit}>Generate Report</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Patient;


import '../styles/signUp.scss'
import React, { useState } from 'react';
import HospitalService from '../services/hospitalService';
import history from '../services/historyService';
import { useToasts } from 'react-toast-notifications';

const SignUp = () =>{
    const [doctorName, setDoctorName] = useState('');
    const [doctorPhone, setDoctorPhone] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    const { addToast } = useToasts();

    const handleChangeDoctorName = (event)=>{
        setDoctorName(event.target.value);
    }   

    const handleChangeDoctorPhone = (event)=>{
        setDoctorPhone(event.target.value);
    }

    const handleChangePassword = (event)=>{
        setPassword(event.target.value);
    }

    const handleChangeRepeatPassword = (event)=>{
        setRepeatPassword(event.target.value);
    }

    const handleSubmit = async (event)=>{
        event.preventDefault();
        if(password!=repeatPassword)
            showNotifs(405, 'Passwords dont match');
        else{
            let reqStatus = await HospitalService.addDoctor(doctorName, doctorPhone, password);
            console.log(reqStatus);
            if(reqStatus==200){
                showNotifs(200, 'Signed-Up Successfully');
                history.push('/');
            }
            else
                showNotifs(500, 'Internal Server Error');
        }
    }

    const handleRedirectSignIn = () =>{
        history.push('/sign-in');
    }

    const showNotifs = (reqStatus, message) =>{
        if(reqStatus==200)
            addToast(message, { appearance: 'success', autoDismiss:true,  autoDismissTimeout: 3000});
        else
            addToast(message, { appearance: 'error', autoDismiss:true,  autoDismissTimeout: 3000});
    }

    return(
        <div className="forms-container-sign-up flex row center">
            <div className="sign-up-div">
                <form className="sign-up-form flex col center-al">
                    <div className="welcome-txt-sign-up mar1">Sign Up</div>
                    <input className="input-initial " value={doctorName} onChange={handleChangeDoctorName} placeholder="Doctor Name" required />
                    <input className="input-initial" value={doctorPhone} onChange={handleChangeDoctorPhone} placeholder="Doctor Phone" required />
                    <input className="input-initial" value={password} onChange={handleChangePassword} type="password" placeholder="Password" required />
                    <input className="input-initial" value={repeatPassword} onChange={handleChangeRepeatPassword} type="password" placeholder="Repeat Password" required />
                    <button className="btn-sign-up" type="submit" onClick={handleSubmit}>Sign Up</button>
                    <div className="flex row start mb1">
                        <div className="link-desc">Already Signed Up?</div>
                        <a className="link-appearance" onClick={handleRedirectSignIn}>Sign In</a>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp;
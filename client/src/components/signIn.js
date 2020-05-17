import React, { useState } from 'react';
import '../styles/signIn.scss'
import HospitalService from '../services/hospitalService';
import { Redirect } from 'react-router';
import { ToastProvider, useToasts } from 'react-toast-notifications';
import history from '../services/historyService';

const SignIn = function(){

    const [doctor, setDoctor] = useState(''); 
    const [password, setPassword] = useState(''); 
    const [path, setPath] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [signInData, setSignInData] = useState({});

    const handleChangeDoctor = (event)=>{
        // this.setState({doctor: event.target.value});
        setDoctor(event.target.value);
        printState();
    }

    const handleChangePassword = (event)=>{
        setPassword(event.target.value);
        printState();
    }

    const printState = ()=>{
        let st = {doctor: doctor, password: password, path: path, redirect: redirect, signInData: signInData};
        console.log(st);
    }

    const handleSubmit = async (event)=>{
        event.preventDefault();
        let signInData = await HospitalService.doctorSignIn(doctor, password);
        console.log(signInData);
        if(signInData['isSignedIn']===true){
            setRedirect(true);
            setSignInData(signInData);
            setPath('/patients');
            history.push(path, {id:doctor, signInData: signInData});
        }
        else{
            //Show incorrect password notification
            console.log('Incorrect Id/Password');
        }
    }

    const handleRedirectSignUp = ()=>{
        // addToast('Saved Successfully', { appearance: 'success' });
        this.setState({redirect: true, path: '/sign-up'});
    }

    return (
        <div className="forms-container flex row center">
            <div className="sign-in-div">
                <form className="sign-in-form flex col center-al">
                    <div className="welcome-txt mar1">Sign In</div>
                    <input className="input-initial mar1 pad1" value={doctor} onChange={handleChangeDoctor} placeholder="Doctor Id" required />
                    <input className="input-initial mar1 pad1" value={password} onChange={handleChangePassword} type="password" placeholder="Password" required />
                    <div className="check-sign-in-container">
                        <input className="check-sign-in mar-pad-0" type="checkbox" name="signed-in"/>
                        <div className="link-desc">Keep Me Signed In</div>
                        <a className="link-appearance">Reset Password</a>
                    </div>
                    <button className="btn-sign-in mar1 width90 pad1" type="submit" onClick={handleSubmit}>Sign In</button>
                    <div className="flex row start mb1">
                        <div className="link-desc">New To Our Website?</div>
                        <a className="link-appearance" onClick={handleRedirectSignUp}>Sign Up</a>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignIn;
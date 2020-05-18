import React, { useState } from 'react';
import '../styles/signIn.scss'
import HospitalService from '../services/hospitalService';
import { useToasts } from 'react-toast-notifications';
import history from '../services/historyService';

const SignIn = function(){

    const [doctor, setDoctor] = useState(''); 
    const [password, setPassword] = useState(''); 
    const [signInData, setSignInData] = useState({});

    const { addToast } = useToasts();

    const handleChangeDoctor = (event)=>{
        setDoctor(event.target.value);
    }

    const handleChangePassword = (event)=>{
        setPassword(event.target.value);
    }

    const handleSubmit = async (event)=>{
        event.preventDefault();
        let signInData = await HospitalService.doctorSignIn(doctor, password);
        console.log(signInData);
        if(signInData['isSignedIn']===true){
            setSignInData(signInData);
            history.push('/patients', {id:doctor, signInData: signInData});
            showNotifs(200, 'Successfully Logged In');
        }
        else{
            showNotifs(405, 'Incorrect Id/Password');
        }
    }

    const handleRedirectSignUp = ()=>{
        history.push('/sign-up');
    }

    const showNotifs = (reqStatus, message) =>{
        if(reqStatus==200)
            addToast(message, { appearance: 'success', autoDismiss:true,  autoDismissTimeout: 3000});
        else
            addToast('Internal Server Error', { appearance: 'error', autoDismiss:true,  autoDismissTimeout: 3000});
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
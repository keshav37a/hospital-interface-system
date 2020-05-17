import React from 'react';
import '../styles/signUp.scss'
import HospitalService from '../services/hospitalService';
import { Redirect } from 'react-router';

// Post Request: `http://localhost:8000/api/v1/doctors/register`\
// Pass the name, phone and password values in the body for this route and this will return the newly 
// registered doctor details.

class SignUp extends React.Component{

    constructor(props) {
        super(props);
        this.state = {doctorName: '', doctorPhone: '', password: '', repeatPassword: '', redirect: false};
    
        this.handleChangeDoctorName = this.handleChangeDoctorName.bind(this);
        this.handleChangeDoctorPhone = this.handleChangeDoctorPhone.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleChangeRepeatPassword = this.handleChangeRepeatPassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeDoctorName(){

    }   

    handleChangeDoctorPhone(){

    }

    handleChangePassword(){

    }

    handleChangeRepeatPassword(){

    }

    handleSubmit(){

    }

    render(){
        return(
            <div className="forms-container-sign-up flex row center">
                <div className="sign-up-div">
                    <form className="sign-up-form flex col center-al">
                        <div className="welcome-txt-sign-up mar1">Sign Up</div>
                        <input className="input-initial mar1 pad1" value={this.state.doctorName} onChange={this.handleChangeDoctorName} placeholder="Doctor Name" required />
                        <input className="input-initial mar1 pad1" value={this.state.doctorPhone} onChange={this.handleChangeDoctorPhone} placeholder="Doctor Phone" required />
                        <input className="input-initial mar1 pad1" value={this.state.password} onChange={this.handleChangePassword} type="password" placeholder="Password" required />
                        <input className="input-initial mar1 pad1" value={this.state.repeatPassword} onChange={this.handleChangeRepeatPassword} type="password" placeholder="Repeat Password" required />
                        <button className="btn-sign-up mar1 width90 pad1" type="submit" onClick={this.handleSubmit}>Sign Up</button>
                        <div className="flex row start mb1">
                            <div className="link-desc">Already Signed Up?</div>
                            <a className="link-appearance">Sign In</a>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default SignUp;
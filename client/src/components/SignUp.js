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
        this.state = {doctorName: '', doctorPhone: '', password: '', repeatPassword: '', redirect: false, path: ''};
    
        this.handleChangeDoctorName = this.handleChangeDoctorName.bind(this);
        this.handleChangeDoctorPhone = this.handleChangeDoctorPhone.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleChangeRepeatPassword = this.handleChangeRepeatPassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRedirectSignIn = this.handleRedirectSignIn.bind(this);
    }

    handleChangeDoctorName(event){
        this.setState({doctorName: event.target.value});
        console.log(this.state);
    }   

    handleChangeDoctorPhone(event){
        this.setState({doctorPhone: event.target.value});
        console.log(this.state);
    }

    handleChangePassword(event){
        this.setState({password: event.target.value});
        console.log(this.state);
    }

    handleChangeRepeatPassword(event){
        this.setState({repeatPassword: event.target.value});
        console.log(this.state);
    }

    handleSubmit(event){
        event.preventDefault();
        if(this.state.password!=this.state.repeatPassword){
            //Show notif that passwords do not match
            console.log('passwords dont match');
        }
        else{
            HospitalService.addDoctor(this.state.doctorName, this.state.doctorPhone, this.state.password);
        }
    }

    handleRedirectSignIn(){
        console.log('handle sign in redirect');
        console.log(this.state);
        this.setState({repeatPassword: "none"});
        this.setState({redirect: true, path: '/'});
    }

    render(){
        if(this.state.redirect) {
            return <Redirect to={{
                pathname: this.state.path
            }}/>
        }
        return(
            <div className="forms-container-sign-up flex row center">
                <div className="sign-up-div">
                    <form className="sign-up-form flex col center-al">
                        <div className="welcome-txt-sign-up mar1">Sign Up</div>
                        <input className="input-initial " value={this.state.doctorName} onChange={this.handleChangeDoctorName} placeholder="Doctor Name" required />
                        <input className="input-initial" value={this.state.doctorPhone} onChange={this.handleChangeDoctorPhone} placeholder="Doctor Phone" required />
                        <input className="input-initial" value={this.state.password} onChange={this.handleChangePassword} type="password" placeholder="Password" required />
                        <input className="input-initial" value={this.state.repeatPassword} onChange={this.handleChangeRepeatPassword} type="password" placeholder="Repeat Password" required />
                        <button className="btn-sign-up" type="submit" onClick={this.handleSubmit}>Sign Up</button>
                        <div className="flex row start mb1">
                            <div className="link-desc">Already Signed Up?</div>
                            <a className="link-appearance" onClick={this.handleRedirectSignIn}>Sign In</a>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default SignUp;
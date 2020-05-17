import React from 'react';
import '../styles/signIn.scss'
import HospitalService from '../services/hospitalService';
import { Redirect } from 'react-router';

class SignIn extends React.Component{

    constructor(props) {
        super(props);
        this.state = {doctor: '', password: '', redirect: false, path: '', signInData: {}};

        this.handleChangeDoctor = this.handleChangeDoctor.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRedirectSignUp = this.handleRedirectSignUp.bind(this);
        
    }
    
    render(){
        if(this.state.redirect) {
            return <Redirect to={{
                pathname: this.state.path,
                state: { id: this.state.doctor, signInData: this.state.signInData}
            }}/>
        }
        return (
            <div className="forms-container flex row center">
                <div className="sign-in-div">
                    <form className="sign-in-form flex col center-al">
                        <div className="welcome-txt mar1">Sign In</div>
                        <input className="input-initial mar1 pad1" value={this.state.doctor} onChange={this.handleChangeDoctor} placeholder="Doctor Id" required />
                        <input className="input-initial mar1 pad1" value={this.state.password} onChange={this.handleChangePassword} type="password" placeholder="Password" required />
                        <div className="check-sign-in-container">
                            <input className="check-sign-in mar-pad-0" type="checkbox" name="signed-in"/>
                            <div className="link-desc">Keep Me Signed In</div>
                            <a className="link-appearance">Reset Password</a>
                        </div>
                        <button className="btn-sign-in mar1 width90 pad1" type="submit" onClick={this.handleSubmit}>Sign In</button>
                        <div className="flex row start mb1">
                            <div className="link-desc">New To Our Website?</div>
                            <a className="link-appearance" onClick={this.handleRedirectSignUp}>Sign Up</a>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    handleChangeDoctor(event){
        this.setState({doctor: event.target.value});
    }

    handleChangePassword(event){
        this.setState({password: event.target.value});
    }

    async handleSubmit(event){
        event.preventDefault();
        let signInData = await HospitalService.doctorSignIn(this.state.doctor, this.state.password);
        if(signInData['isSignedIn']===true){
            this.setState({redirect: true, signInData: signInData, path:'/patients'});
        }
        else{
            //Show incorrect password notification
            console.log('Incorrect Id/Password');
        }
    }

    handleRedirectSignUp(){
        this.setState({redirect: true, path: '/sign-up'});
    }
}


export default SignIn;
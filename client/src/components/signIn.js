import React from 'react';
import '../styles/signIn.scss'

const signIn = ()=>{
    return (
        <div className="forms-container flex row center">
            <div className="sign-in-div">
                <form className="sign-in-form flex col center-al">
                    <div className="welcome-txt mar1">Sign In</div>
                    <input className="input-initial mar1 pad1" type="email" placeholder="Doctor Id" name="email" required/>
                    <input className="input-initial mar1 pad1" type="password" placeholder="Password" name="password" required/>
                    <div className="check-sign-in-container">
                        <input className="check-sign-in mar-pad-0" type="checkbox" name="signed-in"/>
                        <div className="link-desc">Keep Me Signed In</div>
                        <a href="" className="link-appearance">Reset Password</a>
                    </div>
                    <button className="btn-sign-in mar1 width90 pad1" type="submit">Sign In</button>
                    <div className="flex row start mb1">
                        <div className="link-desc">New To Our Website?</div>
                        <a className="link-appearance">Sign Up</a>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default signIn;
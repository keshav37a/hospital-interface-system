import React, {useState, useEffect} from 'react';
import '../styles/header.scss';
import history from '../services/historyService';
import { useToasts } from 'react-toast-notifications';

const Header = ()=>{
    return (
        <div id="header-container" class="flex row start">
        <div id="site-heading" class="grow">Hospital Interface System</div>
        
        <div class="links-container">
            <div><a href="/users/profile/?uId=<%=user._id%>">name</a></div>
            <div><a href="/users/sign-out">Sign Out</a></div>
        </div>
        <div class="links-container">
            <div><a href="/users/signin">Sign In</a></div>
            <div><a href="/users/signup">Sign Up</a></div>
        </div>
    </div>
    )
}

export default Header;
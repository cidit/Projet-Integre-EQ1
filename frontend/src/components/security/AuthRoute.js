import React from "react";
import {Redirect, Route} from 'react-router-dom';

import AuthService from "../../service/security/auth.service";

export default function Rappel(props) {
    const isAuth = !!AuthService.getCurrentUser();
    const isExired = AuthService.verifyTokenExpired();
    const currentRole = AuthService.getTokenDESC();
    const hasRequiredRole = props.requiredRole.includes(currentRole);

    if (isExired) {  
        AuthService.logout();
    }
    if (isAuth && hasRequiredRole && !isExired) {  
        return (
            <Route path={props.path} component={props.component}/>
        )
    } else {
        return (
            <Redirect to='/'/>
        )
    }
}
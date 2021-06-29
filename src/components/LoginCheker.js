import React, { useState, useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PrivateRoute from './PrivateRoute';

const LoginChecker = ({ component: Component, ...rest }) => {
    const { currentUser } = useAuth();
    //console.log(currentUser)
    console.log("from loginchecker", Component)
    return (
        <>
            <Route {...rest} render = {props => {
                return currentUser ? <PrivateRoute Component = {Component} {...props} {...rest}  /> : <Redirect to = "/login" />
        }}></Route>
        </>
    )
}

export default LoginChecker



//currentUser ? <Component {...props} {...rest}  /> : <Redirect to = "/login" />

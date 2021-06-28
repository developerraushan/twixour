import React, { useState, useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from './Header';
import { database } from '../firebase/firebase';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { currentUser } = useAuth();
    //console.log(rest.hello)
    return (
        <>
        <Header />
            <Route {...rest} render = {props => {
            return currentUser ? <Component {...props} {...rest}  /> : <Redirect to = "/login" />
        }}></Route>
        </>
    )
}

export default PrivateRoute



//currentUser ? <Component {...props} {...rest}  /> : <Redirect to = "/login" />

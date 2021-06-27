import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from './Header';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { currentUser } = useAuth();
    return (
        <>
        <Header />
            <Route {...rest} render = {props => {
            return currentUser ? <Component {...props} /> : <Redirect to = "/login" />
        }}></Route>
        </>
    )
}

export default PrivateRoute

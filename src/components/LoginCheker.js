import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PrivateRoute from './PrivateRoute';

const LoginChecker = ({ component: Component, projectObjects: projectObjects, coursesObjects : coursesObjects, ...rest }) => {
    const { currentUser } = useAuth();
  

    return (
        <div style = {{marginBottom: "30px"}}>
            <Route>
                {currentUser ? <PrivateRoute projectObjects = {projectObjects} component = {Component} coursesObjects = {coursesObjects} /> : <Redirect to = "/login" />}
            </Route>
            {/* <Route {...rest} render = {props => {
                return currentUser ? <PrivateRoute  Component = {Component} {...props} {...rest} coursesObjects = {coursesObjects}  /> : <Redirect to = "/login" />
        }}></Route> */}
        </div>
    )
}

export default LoginChecker



//currentUser ? <Component {...props} {...rest}  /> : <Redirect to = "/login" />

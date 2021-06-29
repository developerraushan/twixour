import React from 'react'
import { Route, useLocation } from 'react-router-dom';
import Header from './Header';

const MyRouter = ({ component: Component, ...rest }) => {
    
    const location = useLocation().pathname;
    //console.log(location)
   
    return (
        <> {!(location == "/login") ? <Header /> : ""}
        
            <Route {...rest} render = {props => {
            return <Component {...props} /> 
        }}></Route>
        </>
        
    );
}

export default MyRouter

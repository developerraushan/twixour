import React, { useState, useEffect } from 'react'
import { Route } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from './Header';
import { database } from '../firebase/firebase';
import NewHeader from './NewHeader';

const PrivateRoute = ({ component: Component, projectObjects : projectObjects, coursesObjects: coursesObjects, ...rest }) => {
    const { currentUser } = useAuth();
    
    const [profileObjects, setProfileObjects] = useState('');
    const usersRef = database.ref(`users`);
    const profileURL = usersRef.child(currentUser.uid).child(`profile`);
    

    useEffect(()=>{
        profileURL.on('value', snapshot => {
            if(snapshot.val() != null) {
                setProfileObjects({
                    ...snapshot.val()
                })
                
            }
        })
    },[])
   
    return (
        <>
        <Header />
            <Route {...rest} render = {props => {
            return  <Component projectObjects = {projectObjects} profileObjects = {profileObjects}  currentUser = {currentUser} coursesObjects = {coursesObjects} {...props} {...rest}  /> 
        }}></Route>
        </>
    )
}

export default PrivateRoute



//currentUser ? <Component {...props} {...rest}  /> : <Redirect to = "/login" />

import React, {useState} from 'react'
import { useAuth } from '../context/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import Header from './Header';

const Dashboard = () => {
    
    const { currentUser } = useAuth();
    
    return (
        <>
            <div className = "card">
                <div className = "card-body">
                    <h2 className = "text-center mb-4">Profile</h2>
                   
                    <strong>Email: </strong> {currentUser.email}
                </div>
            </div>
            <div className = "w-100 text-center mt-2">
               
            </div>
        </>
    )
}

export default Dashboard

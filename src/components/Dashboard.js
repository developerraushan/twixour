import React from 'react'
import { useAuth } from '../context/AuthContext';
import App from './App';

const Dashboard = () => {
    
    const { currentUser } = useAuth();
    
    return (
        <div className = "container">
        <div className = "row">
            <h2 className = "text-center mb-4">DASHBOARD</h2>
        </div>
        <div className = "row justify-content-around" style = {{fontSize: "1.2rem"}}>
            <div className = "col-6">
            <strong>Email: </strong> {currentUser.email}
            </div>
            <div className = "col-3">
            <strong>Enrolled in:</strong> UC2101
            </div>
            
            
        </div>
            
            
        </div>
    )
}

export default Dashboard

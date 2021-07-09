import React, { useState, useEffect } from 'react'
import { database } from '../../firebase/firebase';
import Student from './Student';

const Students = (props) => {
    const [usersObjects, setUsersObjects] = useState('');
    const usersRef = database.ref(`users`);

    // all users list
    useEffect(()=>{
        usersRef.on('value', snapshot => {
            if(snapshot.val() != null) {
                setUsersObjects({
                ...snapshot.val()
            })
            } 
        })
    },[])
    const usersObjectsKeys = Object.keys(usersObjects);
    
    return (
        <div>
            <div className = "table-responsive">
                <table className = "table table-hover  table-lg table-dark">
                    <thead>
                       <tr>
                       <th>Profile Photo</th>
                       <th>Name</th>
                       
                       <th>Father's Name</th>
                       <th>Mother's Name</th>
                       <th>Phone No.</th>
                       <th>Email</th>
                       
                       </tr>
                   </thead>
                   <tbody>
                    { usersObjects && 
                        usersObjectsKeys.map(id => {
                        return <Student key = {id} id = {id} usersObjects = {usersObjects} />
                        })

                    }
                   </tbody>
                </table>
            </div>
            
        </div>
    )
}

export default Students

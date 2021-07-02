import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import { database } from '../../firebase/firebase';

const Fees = (props) => {
    const coursesObjects = props.coursesObjects
    const feesRef = database.ref('fees');
    const usersRef = database.ref(`users`);
    const [feesList, setFeesList] = useState('');
    const [usersList, setUsersList] = useState('');
    // const tdate = new Date();
    // const formatD = tdate.toJSON().slice(0,10).replace(/-/g, '/')
    // const fDate = tdate.getDate() + '-' + tdate.getMonth() + '-' + tdate.getFullYear();
    // const wdate = tdate.toLocaleDateString('en-GB').replace(/-/g, '-')
    // console.log(wdate)
    let feesListKeys = [];
    if(feesList) {
        feesListKeys = Object.keys(feesList)
    }
    useEffect(()=>{
        feesRef.on('value', snapshot => {
            if(snapshot.val() != null) {
                setFeesList({
                    ...snapshot.val()
                })
                
            }
        })
    },[])
    useEffect(()=>{
        usersRef.on('value', snapshot => {
            if(snapshot.val() != null) {
                setUsersList({
                    ...snapshot.val()
                })
                
            }
        })
    },[])
    return (
        <div className = "container">
           <h1>All Transactions</h1> 
           <div className = "row mt-3">
               <div className = "col-9">
                   <div className = "alert alert-danger" style = {{fontSize: "1.5rem"}}>
                       Fee Due: - &#8377; 10000
                   </div>
               </div>
               <div className = "col-3 mt-2">
               <Link to = "/payment/pay-fee">
               <h1><span className = "badge rounded-pill bg-danger">Pay Now</span></h1>
               </Link>
               </div>
           </div>

           <div className = "row">
               <table>
                   <thead>
                       <th>Student Name</th>
                       <td>Course</td>
                       <td>Payment Date</td>
                       <td>Amount Paid</td>
                       <td>Payment Mode</td>
                   </thead>
                   <tbody>
                        {feesListKeys.map(key => {
                            return <tr key = {key}>
                                <td>{usersList && usersList[feesList[key].user].profile.first_name + ' ' + usersList[feesList[key].user].profile.last_name }</td>
                                <td>{coursesObjects && coursesObjects[feesList[key].course].title}</td>
                                <td>{feesList[key].paymentDate}</td>
                                <td>{feesList[key].paidAmount}</td>
                                <td>{feesList[key].paymentMode}</td>
                            </tr>
                        })}
                       <tr>
                           <td></td>
                       </tr>
                   </tbody>
               </table>
           </div>
           
                
          
        </div>
    )
}

export default Fees

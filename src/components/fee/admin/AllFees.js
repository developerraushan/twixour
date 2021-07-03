import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import { database } from '../../../firebase/firebase';

const AllFees = (props) => {
    const coursesObjects = props.coursesObjects
    const feesRef = database.ref('fees');
    const usersRef = database.ref(`users`);
    const [feesList, setFeesList] = useState('');
    const [usersList, setUsersList] = useState('');
    const [monthNumber, setMonthNumeber] = useState('');
    const [filteredFees, setFilteredFees] = useState([]);
    const monthOptions = [
        {value: '1' , label: 'January'},
        {value: '2' , label: 'February'},
        {value: '3' , label: 'March'},
        {value: '4' , label: 'April'},
        {value: '5' , label: 'May'},
        {value: '6' , label: 'June'},
        {value: '7' , label: 'July'},
        {value: '8' , label: 'August'},
        {value: '9' , label: 'September'},
        {value: '10' , label: 'October'},
        {value: '11' , label: 'November'},
        {value: '12' , label: 'December'},
    ]
   
    
    useEffect(()=>{
        feesRef.on('value', snapshot => {
            if(snapshot.val() != null) {
                setFeesList({
                    ...snapshot.val()
                })
                setFilteredFees({
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
    const handleSelectChange = (event) => {
        const getValue = event.value;
        setMonthNumeber(getValue);
        
        
    }
   
    
    Object.filter = (obj, predicate) => 
    Object.keys(obj)
          .filter( key => predicate(obj[key]) )
          .reduce( (res, key) => (res[key] = obj[key], res), {} );
    
    const handleGoButton = (event) => {
        event.preventDefault();
        
        if(feesList) {
            const newFees = Object.filter(feesList, fee => fee.paymentDate.slice(4,5) === monthNumber)
            setFilteredFees(newFees);
        }
        
    }
    const filteredFeesKeys = Object.keys(filteredFees);
    
    return (
        <div className = "container">
           <h1>All Transactions</h1> 
           <div className = "row mt-3">
               <h1><Link to = "/payment/pay-fee">
               <span className = "badge rounded-pill bg-danger">Pay Now</span>
               </Link></h1>
           </div>
            <div className = "row mt-3">
                <div className = "row" style = {{fontWeight: "bold"}}> Month Selector</div>
                <div className = "row">
                <div className = "col-10"><Select   options={monthOptions} onChange = {handleSelectChange} /></div>
                <div className = "col-2">
                    <button onClick = {handleGoButton} className = "btn btn-danger">Go</button>
                </div>
                
                </div>
                
                
                
            </div>
           <div className = "row mt-3">
                <div className = "table-responsive">
                <table className = "table">
                   <thead>
                       <tr>
                       <th>Student Name</th>
                       <th>Course</th>
                       <th>Payment Date</th>
                       <th>Amount Paid</th>
                       <th>Payment Mode</th>
                       
                       </tr>
                   </thead>
                   <tbody>
                        {filteredFeesKeys.map(key => {
                            return <tr key = {key}>
                                <td>{usersList && usersList[filteredFees[key].user].profile.first_name + ' ' + usersList[filteredFees[key].user].profile.last_name }</td>
                                <td>{coursesObjects && coursesObjects[filteredFees[key].course].title}</td>
                                <td>{filteredFees[key].paymentDate}</td>
                                <td>&#8377; {filteredFees[key].paidAmount}</td>
                                <td>{filteredFees[key].paymentMode}</td>
                                
                            </tr>
                        })}
                       <tr>
                           <td></td>
                       </tr>
                   </tbody>
               </table>
                </div>
               
           </div>
           
                
          
        </div>
    )
}

export default AllFees

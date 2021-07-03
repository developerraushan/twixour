import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import { database } from '../../../firebase/firebase';
import { useAuth } from '../../../context/AuthContext';

const PaymentList = (props) => {
    const profileObjects = props.profileObjects;
    const coursesObjects = props.coursesObjects
    const feesRef = database.ref('fees');
    const usersRef = database.ref(`users`);
    const [feesList, setFeesList] = useState('');
    const [usersList, setUsersList] = useState('');
    //const [monthNumber, setMonthNumeber] = useState('');
    //const [filteredFees, setFilteredFees] = useState([]);
    const [totalPaid, setTotalPaid] = useState(0);

    const { currentUser } = useAuth();
    // const monthOptions = [
    //     {value: '1' , label: 'January'},
    //     {value: '2' , label: 'February'},
    //     {value: '3' , label: 'March'},
    //     {value: '4' , label: 'April'},
    //     {value: '5' , label: 'May'},
    //     {value: '6' , label: 'June'},
    //     {value: '7' , label: 'July'},
    //     {value: '8' , label: 'August'},
    //     {value: '9' , label: 'September'},
    //     {value: '10' , label: 'October'},
    //     {value: '11' , label: 'November'},
    //     {value: '12' , label: 'December'},
    // ]
    Object.filter = (obj, predicate) => 
    Object.keys(obj)
          .filter( key => predicate(obj[key]) )
          .reduce( (res, key) => (res[key] = obj[key], res), {} );
    
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
    let filteredFees = []
    if(feesList && currentUser) {
        filteredFees = Object.filter(feesList, fee => fee.user === currentUser.uid)
        
    }
    //console.log(currentUser.uid)
    // const handleSelectChange = (event) => {
    //     const getValue = event.value;
    //     setMonthNumeber(getValue);
        
        
    // }
   
    
    
    
    // const handleGoButton = (event) => {
    //     event.preventDefault();
        
    //     if(feesList) {
    //         const newFees = Object.filter(feesList, fee => fee.paymentDate.slice(4,5) === monthNumber)
    //         setFilteredFees(newFees);
    //     }
        
    // }
    const filteredFeesKeys = Object.keys(filteredFees);
    useEffect(() =>{
        let total = 0;
        if(filteredFees) {
            filteredFeesKeys.map(key => { total = total + parseInt(filteredFees[key].paidAmount, 10)})
            setTotalPaid(total)
        }
        
    },[filteredFees])

    return (
        <div className = "container">
           <h1 className = "text-center mt-3">All Transactions</h1> 
           <div className = "row mt-3" style ={{ fontWeight: "bold", fontSize: "1.2rem"}}>
              Course: {profileObjects && coursesObjects ? <>
                   {coursesObjects[profileObjects.course].title}
               </> : ""}
           </div>
           <div className = "row mt-3" style ={{ fontWeight: "bold", fontSize: "1.5rem"}}>
               {profileObjects && <>
                   {profileObjects.first_name} {profileObjects.last_name}
               </>}
           </div>
           <div className = "row mt-3">
               
                {/* <div className = "alert alert-danger" style = {{fontSize: "1.5rem"}}>
                    Fee Due: - &#8377; 10000
                </div> */}
               
               {/* <div className = "col-3 mt-2">
               <Link to = "/payment/pay-fee">
               <h1><span className = "badge rounded-pill bg-danger">Pay Now</span></h1>
               </Link>
               </div> */}
           </div>
            {/* <div className = "row mt-3">
                <div className = "row" style = {{fontWeight: "bold"}}> Month Selector</div>
                <div className = "row">
                <div className = "col-10"><Select   options={monthOptions} onChange = {handleSelectChange} /></div>
                <div className = "col-2">
                    <button onClick = {handleGoButton} className = "btn btn-danger">Go</button>
                </div>
                
                </div>
                
                
                
            </div> */}
           <div className = "row mt-3">
                <div className = "table-responsive">
                <table className = "table">
                   <thead>
                       <tr>
                       
                       <th>Payment Date</th>
                       <th>Amount Paid</th>
                       <th>Payment Mode</th>
                       
                       </tr>
                   </thead>
                   <tbody>
                        {filteredFeesKeys.map(key => {
                            return <tr key = {key}>
                                
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
           {/* <div className = "row mt-3">
               <span style = {{fontSize: "1.4rem", fontWeight: "bold"}}> Total Amount Paid:  &#8377;{totalPaid} </span>
           </div> */}
           
                
          
        </div>
    )
}

export default PaymentList

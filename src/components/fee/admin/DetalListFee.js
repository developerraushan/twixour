import React, { useState, useEffect} from 'react'

const DetalListFee = (props) => {
    const profile = props.location.state.user.profile;
    //const id = profile.id;
    const feesList = props.location.state.feesList;
    const coursesObjects = props.coursesObjects;
    const [totalPaid, setTotalPaid] = useState(0);

    Object.filter = (obj, predicate) => 
    Object.keys(obj)
          .filter( key => predicate(obj[key]) )
          .reduce( (res, key) => (res[key] = obj[key], res), {} );
    
    let filteredFees = []

    if(feesList && profile) {
        filteredFees = Object.filter(feesList, fee => fee.user === profile.id);         
    }
    const filteredFeesKeys = Object.keys(filteredFees);
    
    useEffect(() =>{
        let total = 0;
        if(filteredFees) {
            filteredFeesKeys.map(key => { total = total + parseInt(filteredFees[key].paidAmount, 10)})
            setTotalPaid(total)
        }
        
    },[filteredFees])
    console.log(profile)
    return (
        <div className = "container">
            <div className = "row mt-3" style = {{fontSize: "1.5rem", fontWeight: "bold"}}>
                <div className="alert alert-danger">
                    <span>Fee Due:</span>&#8377; {parseInt(profile.courseFee,10) - totalPaid}
                </div>
            </div>
            <div className = "row mt-3" style = {{fontSize: "1.6rem", fontWeight: "bold"}}>
                {profile.first_name} {profile.last_name}
            </div>
            {coursesObjects ? 
                
                <div className = "row mt-3" style = {{fontSize: "1.3rem", fontWeight: "bold"}}>
                    {coursesObjects[profile.course].title}
                </div>

            : ""}
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
                    </tbody>
                </table>
                </div>
            </div>
            <div className = "row mt-3">
               <span style = {{fontSize: "1.4rem", fontWeight: "bold"}}> Total Amount Paid:  &#8377;{totalPaid} </span>
           </div>
        </div>
    )
}

export default DetalListFee

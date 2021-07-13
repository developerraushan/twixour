import React from 'react'
import { useHistory } from 'react-router';

const StudentDetail = (props) => {
    const history = useHistory();
    const profile = props.location.state.profile;
    const coursesObjects = props.coursesObjects;
    const course = coursesObjects[profile.course];
  
   const handleBack = (event) => {
       event.preventDefault();
       history.push("/students");
   }
    return (
        <div className = "container">
            <div className = "row mt-3">
                <div className = "col-3 mt-3">
                <button className = "btn" onClick = {handleBack} style = {{backgroundColor: "#4723d9", color: "white"}}>&laquo;Back</button>
                </div>
                <div className = "col-9"></div>
            </div>
            <div className = "card mt-5" style = {{width: "22rem", margin: "0 auto", float: "none",marginBottom: "10px"}}>
                <img src = {profile.photoURL} alt = "..." />
                <div className = "card-body">
                    <div className = "row mt-3">
                       <span>
                       <b>Name:</b> {profile.first_name} {profile.last_name}
                       </span>
                    </div>
                    <div className = "row mt-3">
                        <span>
                            <b>Gender:</b> {profile.gender}
                        </span>
                        
                    </div>


                    <div className = "row mt-3">
                        <span>
                            <b>Father's Name:</b> {profile.fatherName}
                        </span>
                    </div>
                    <div className = "row mt-3">
                        <span>
                            <b>Mother's Name</b> {profile.motherName}
                        </span>
                        
                    </div>
                    <div className = "row mt-3">
                        <span>
                            <b>Course: </b> {course.title} 
                        </span>
                        
                    </div>
                    <div className = "row mt-3">
                        <span>
                            <b>Course Fee: </b> {profile.courseFee}
                        </span>
                        
                    </div>
                    <div className = "row mt-3">
                        <span>
                            <b>Email: </b> {profile.email} 
                        </span>
                        
                    </div>
                    <div className = "row mt-3">
                        <span>
                            <b>Phone: </b> {profile.phone}
                        </span>
                        
                    </div>
                    
                    <div className = "row mt-3">
                        <span>
                            <b>Address: </b> {profile.address}
                        </span>
                        
                    </div>
                    <div className = "row mt-3">
                        <span>
                            <b>Pincode: </b> {profile.pincode} 
                        </span>
                        
                    </div>
                    <div className = "row mt-3">
                        <span>
                            <b>City: </b> {profile.city}
                        </span>
                        
                    </div>
                    <div className = "row mt-3">
                        <span>
                            <b>State: </b> {profile.state} 
                        </span>
                        
                    </div>
                    <div className = "row mt-3">
                        <span>
                            <b>Country: </b> {profile.country}
                        </span>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StudentDetail

import React from 'react'

const StudentDetail = (props) => {
    const profile = props.location.state.profile;
    const coursesObjects = props.coursesObjects;
    const course = coursesObjects[profile.course];
  
   
    return (
        <div className = "container">
            <div className = "card" style = {{width: "22rem", margin: "0 auto", float: "none",marginBottom: "10px"}}>
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

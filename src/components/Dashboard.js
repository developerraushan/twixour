import React, {useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext';

const Dashboard = (props) => {
    //const [profileObjects, setProfileObjects] = useState('');
    //const [coursesObjects, setCoursesObjects] = useState('');
    const profileObjects = props.profileObjects;
    const coursesObjects = props.coursesObjects;
    //const currentCourse = coursesObjects[profileObjects.course]
    const currentCourse = (coursesObjects[profileObjects.course]);
    const { currentUser } = useAuth();
    let logo = require('../assets/Images/dashboard.png').default;
    const projectObjects = props.projectObjects;
    const arrayProjectObjects = Object.values(projectObjects)
    // const studentAssignment = 
    
    let projects = []
    
    if(projectObjects) {
        projects = (arrayProjectObjects.filter(project => project.course == profileObjects.course))
    }
    
    // useEffect(()=>{
    //     setProfileObjects(props.profileObjects)
    // },props.profileObject)

    // useEffect(()=>{
    //     setCoursesObjects(props.coursesObjects)
    // },props.profileObject)

    
    return (
        <div className = "container">
        <div className = "row">
            <img src = {logo} alt = "dashboard" className = "mx-auto d-block" style = {{width: "70%"}} />
            {/* <h2 className = "text-center mb-4">DASHBOARD</h2> */}
        </div>
        <div className = "row justify-content-around" style = {{fontSize: "1.2rem"}}>
            <div className = "col-6">
            <strong>Email: </strong> {currentUser.email}
            </div>
            <div className = "col-3">
            <strong>Enrolled in:</strong> {currentCourse && currentCourse.title}
            </div>
            
            
        </div>
        <div className ="row mt-5" style = {{fontSize: "1.3rem"}}>
            Fee due: &#8377;
        </div>

        <div className ="row mt-5" style = {{fontSize: "1.3rem"}}>
            Projects in this course
            {projects.map((project, index) => {
                return <div key = {index}>
                Title: {project.title} <br />
                Date Announced: {project.dateAnnounced} <br /> <br />
                </div>
            })}
        </div>

        <div className ="row mt-5" style = {{fontSize: "1.3rem"}}>
            You have submitted: ______ Projects
        </div>
            
            
        </div>
    )
}

export default Dashboard

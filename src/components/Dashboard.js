import React, {useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext';
import { database } from '../firebase/firebase';

const Dashboard = (props) => {
    //const [profileObjects, setProfileObjects] = useState('');
    //const [coursesObjects, setCoursesObjects] = useState('');
    const profileObjects = props.profileObjects;
    const coursesObjects = props.coursesObjects;
    //const currentCourse = coursesObjects[profileObjects.course]
    const [studentProjectsSubmitted, setStudentProjectsSubmitted] = useState('');
    const currentCourse = (coursesObjects[profileObjects.course]);
    const { currentUser } = useAuth();
    let logo = require('../assets/Images/dashboard.png').default;
    const projectObjects = props.projectObjects;
    const arrayProjectObjects = Object.values(projectObjects)
   
    const usersRef = database.ref(`users`);
    const studentProjectsSubmittedURL = usersRef.child(currentUser.uid).child(`projects`);

    let projects = []
    
    if(projectObjects) {
        projects = (arrayProjectObjects.filter(project => project.course == profileObjects.course))
    }
    
    // useEffect(()=>{
    //     setProfileObjects(props.profileObjects)
    // },props.profileObject)

    useEffect(()=>{
        if(studentProjectsSubmittedURL) {
            studentProjectsSubmittedURL.on('value', snapshot => {
                if(snapshot.val() != null) {
                    setStudentProjectsSubmitted({
                        ...snapshot.val()
                    })
                    
                }
            })
        }
    },[])
    const studentProjectsSubmittedKeys = Object.keys(studentProjectsSubmitted)
    
    return (
        <div className = "container">
        <div className = "row">
            <img src = {logo} alt = "dashboard" className = "mx-auto d-block" style = {{width: "70%"}} />
            {/* <h2 className = "text-center mb-4">DASHBOARD</h2> */}
        </div>
        <div className = "row" style = {{fontSize: "1.6rem"}}>
            <div className = "col">
            <strong>{profileObjects && profileObjects.first_name} {profileObjects && profileObjects.last_name}</strong>&nbsp;&nbsp;
            </div>
        </div>
        <div className = "row justify-content-around" style = {{fontSize: "1.2rem"}}>
            <div className = "col-6">
            Email: <strong> {currentUser.email}</strong>
            </div>
            <div className = "col-3">
            Enrolled in: <strong style = {{color: "red"}}>{currentCourse && currentCourse.title} </strong>
            </div>
            
            
        </div>
        
        {/* <div className ="row mt-5" style = {{fontSize: "1.3rem"}}>
            <div className = "alert alert-danger">
            Fee due: &#8377;
            </div> 
        </div> */}

        {/* <div className ="row mt-5" style = {{fontSize: "1.3rem"}}>
            Projects in this course
            {projects.map((project, index) => {
                return <div key = {index}>
                Title: {project.title} <br />
                Date Announced: {project.dateAnnounced} <br /> <br />
                </div>
            })}
        </div> */}

        <div className ="row mt-5" style = {{fontSize: "1.3rem"}}>
            <div className = "alert alert-primary">
                You have submitted: {studentProjectsSubmitted && studentProjectsSubmittedKeys.length} {studentProjectsSubmitted && studentProjectsSubmittedKeys.length > 1 ? "Projects" : "Project"}
            </div>
            
        </div>
            
            
        </div>
    )
}

export default Dashboard

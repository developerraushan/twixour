import React from 'react'
import { Link } from 'react-router-dom'

const IndiProject = (props) => {
    
    //console.log(props.profileObjects.course)
    const id = props.id
    const courseId = props.profileObjects.course;
    const projectObjects = props.projectObjects;
    const project = projectObjects[id];
    const currentUser = props.currentUser;
    const profileObjects = props.profileObjects
    const currentCourse = props.currentCourse;
    console.log("welcome to id", id);
    const pathname ="/" + currentCourse.title + "/" + profileObjects.first_name +  "/" + project.title  
    return (
        <div className = "container">
        <div className = "row mt-4">
            <span>Title: {project.title}</span>
            
                <span>Date Announced: 
                 {project.dateAnnounced} 
                </span>
                
                
        </div>
        <div className = "row mt-3">
        <Link to = {{
                pathname: pathname,
                state: {
                    project: project,
                    id: id,
                    currentCourse: currentCourse
                }
            }} style = {{marginLeft: "20px", textDecoration: "none"}} ><button className = "btn btn-danger">Start</button></Link>
        </div>
        </div>
    )
}

export default IndiProject









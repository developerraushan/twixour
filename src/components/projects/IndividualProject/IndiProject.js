import React from 'react'
import { Link } from 'react-router-dom'

const IndiProject = (props) => {
    
    
    const id = props.id
    //const courseId = props.profileObjects.course;
    const projectObjects = props.projectObjects;
    const project = projectObjects[id];
    //const currentUser = props.currentUser;
    const profileObjects = props.profileObjects
    const currentCourse = props.currentCourse;
    
    const pathname ="/" + currentCourse.title + "/" + profileObjects.first_name +  "/" + project.title  
    return (
        <div className = "container">
        <div className = "row mt-4">
            <h4>Title: {project.title} <span className ="badge rounded-pill bg-danger">{project.tag}</span> </h4>
            
                <span>Date Announced: 
                 {project.dateAnnounced} 
                </span>
                
                
        </div>
        <div className = "row mt-3">
        <h1><Link to = {{
                pathname: pathname,
                state: {
                    project: project,
                    id: id,
                    currentCourse: currentCourse
                }
            }} style = {{marginLeft: "20px", textDecoration: "none"}} ><button className = "btn btn-danger">Start</button></Link></h1>
        </div>
        </div>
    )
}

export default IndiProject









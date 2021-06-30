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
    
    const pathname ="/" + currentCourse.title + "/" + profileObjects.first_name +  "/" + project.title  
    return (
        <div className = "row mt-5">
            <span>Title: <Link to = {{
                pathname: pathname,
                state: {
                    project: project,
                    id: id,
                    currentCourse: currentCourse
                }
            }} style = {{marginLeft: "20px", textDecoration: "none"}} >{project.title}</Link> </span>
            
                <span>Date Announced: 
                 {project.dateAnnounced} 
                </span>
        </div>
    )
}

export default IndiProject









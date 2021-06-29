import React from 'react'
import { Link } from 'react-router-dom';

const Project = (props) => {
    const projects = props.projectsObjects;
    const id = props.id;
    const pathname = "/projects/" + projects[id].title.split(" ").join("-")
    const coursesObjects = props.coursesObjects;
    //console.log(projects[id].duration)
    return (
        <div className = "container mt-3">
            <div className = "card">
                <div className="title text-center">
                    Project Title: &nbsp;&nbsp;<strong>
                        <Link to = {{
                            pathname: pathname,
                            state: {
                                project: projects[id],
                                id: id,
                                course: coursesObjects[projects[id].course],
                            }
                        }} style = {{ textDecoration: 'none'}}>
                        {projects[id].title}
                        </Link>
                       <br/> from: {projects[id].tag}
                    </strong>
                </div>
                <div className = "card-body">
                   
                    <strong>Description:</strong> &nbsp;&nbsp;{projects[id].description} <br/>
                    <strong>Date Announced</strong> &nbsp;&nbsp;{projects[id].dateAnnounced} <br/>
                    <strong>Submission Date</strong> &nbsp;&nbsp;{projects[id].submissionDate} <br/>
                    
                </div>
            </div>
            
        </div>
    )
}

export default Project

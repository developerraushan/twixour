import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Projects = () => {
    const [projects, setProjects] = useState([
        {
            title: '',
            
        }
    ]); 

    return (
        <div className = "container mt-3">
            <Link to = "/projects/add-project" style = {{ textDecoration: 'none' }}>
            <span className = "btn btn-primary">Add Project</span>
            </Link>

            {/* {courses.map(id => {
                return <Course coursesObjects = {coursesObjects} key = {id} id = {id}  />
            })} */}
            
        </div>
    )
}

export default Projects

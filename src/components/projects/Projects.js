import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { database } from '../../firebase/firebase';

import Project from './Project';

const Projects = () => {
    const [projectsObjects, setProjectsObjects] = useState('');
    const coursesRef = database.ref(`projects`);
    const projects = Object.keys(projectsObjects);
    
    useEffect(()=>{
        let isMounted = true
        coursesRef.on('value', snapshot => {
            if(snapshot.val() != null) {
                setProjectsObjects({
                    ...snapshot.val()
                })
                
            }
        });
        return () => { isMounted = false };
    },[])
    
    return (
        <div className = "container mt-3">
            <Link to = "/projects/add-project" style = {{ textDecoration: 'none' }}>
            <span className = "btn btn-primary">Add Project</span>
            </Link>

             {projects.map(id => {
                return <Project projectsObjects = {projectsObjects} key = {id} id = {id}  />
            })} 
            
        </div>
    )
}

export default Projects

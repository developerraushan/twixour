import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { database } from '../../firebase/firebase';

import Project from './Project';

const Projects = (props) => {
    const [projectsObjects, setProjectsObjects] = useState('');
    const projectsRef = database.ref(`projects`);
    const projects = Object.keys(projectsObjects);
    const coursesObjects = props.coursesObjects;
    useEffect(()=>{
        let isMounted = true
        projectsRef.on('value', snapshot => {
            if(snapshot.val() != null) {
                setProjectsObjects({
                    ...snapshot.val()
                })
                
            }
        });
        return () => { isMounted = false };
    },[])
    
    return (
        <div className = "container mt-5">
            <Link to = "/projects/add-project" style = {{ textDecoration: 'none' }}>
            <span className = "btn mt-3" style = {{backgroundColor: "#4723d9", color: "white"}}>Add Project</span>
            </Link>

             {projects.map(id => {
                return <Project coursesObjects = {coursesObjects} projectsObjects = {projectsObjects} key = {id} id = {id}  />
            })} 
            
        </div>
    )
}

export default Projects

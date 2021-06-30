import React, { useState, useEffect } from 'react'
import { useAuth } from '../../../context/AuthContext';
import { Link } from 'react-router-dom';
import IndiProject from './IndiProject';

const MyProjects = (props) => {
    //const [profileObjects, setProfileObjects] = useState('');
    //const [coursesObjects, setCoursesObjects] = useState('');
    const profileObjects = props.profileObjects;
    const coursesObjects = props.coursesObjects;
    //const currentCourse = coursesObjects[profileObjects.course]
    const currentCourse = (coursesObjects[profileObjects.course]);
    const { currentUser } = useAuth();
    const [btnDisabled, setBtnDisabled] = useState(false)
    let logo = require('../../../assets/Images/my_projects.png').default;
    const projectObjects = props.projectObjects;
    const projectKeys = Object.keys(projectObjects);
    const arrayProjectObjects = Object.values(projectObjects)
    // const studentAssignment = 
    //console.log("profiel" ,profileObjects.course)
    let projects = []
   
    if(projectObjects) {
        projects = (arrayProjectObjects.filter(project => project.course === profileObjects.course))
    }
    //console.log(projects)

    // useEffect(()=>{
    //     setProfileObjects(props.profileObjects)
    // },props.profileObject)

    // useEffect(()=>{
    //     setCoursesObjects(props.coursesObjects)
    // },props.profileObject)

    //console.log(projectObjects);
    const handleClickStart = (event) => {
        event.preventDefault();
        setBtnDisabled(true)
    }
    return (
        <div className = "container">
        <div className = "row mt-5">
            <img src = {logo} alt = "dashboard" className = "mx-auto d-block" style = {{width: "70%"}} />
            {/* <h2 className = "text-center mb-4">My Projects</h2> */}
        </div>
        
        <div className = "row mt-5">
            <span style ={{fontSize: "1.5rem"}}>
            Course:  <b className = "text-danger" style = {{fontSize: "1.8rem"}}>{currentCourse && currentCourse.title}</b>
            </span>
        </div>

        <div className = "row mt-3">
        <div className="btn-group" role="group" aria-label="Basic example">
            <button type="button" className="btn btn-secondary">Scratch</button>
            <button type="button" className="btn btn-secondary">Figma</button>
            <button type="button" className="btn btn-secondary">HTML</button>
            <button type="button" className="btn btn-secondary">CSS</button>
            <button type="button" className="btn btn-secondary">Bootstrap</button>
            <button type="button" className="btn btn-secondary">Python</button>
            <button type="button" className="btn btn-secondary">Django</button>
        </div>
        </div>
        <div className = "row" style = {{fontSize: "1.3rem"}}>
            {/* {projects.map((project, index) => {
                return <div className = "row mt-5" key = {index} style = {{border: "2px solid red"}}>
                
                <span>Title: <Link to = "student-project-detail" style = {{marginLeft: "20px",textDecoration: "none",  display: "inline-block !important"}}> {project.title} </Link> </span>
                <span>Date Announced: {project.dateAnnounced}</span>
                
                
                </div>
            })} */}

            {projectKeys.map(id => {
                return <IndiProject projectObjects = {projectObjects} profileObjects = {profileObjects} currentUser = {currentUser} profileObjects = {profileObjects} currentCourse = {currentCourse} id = {id} key = {id}></IndiProject>
            })}
        </div>











        </div>
    )
}

export default MyProjects

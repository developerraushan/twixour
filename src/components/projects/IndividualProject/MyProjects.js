import React, { useState } from 'react'
import { useAuth } from '../../../context/AuthContext';

import IndiProject from './IndiProject';

const MyProjects = (props) => {
    //const [profileObjects, setProfileObjects] = useState('');
    //const [coursesObjects, setCoursesObjects] = useState('');
    const profileObjects = props.profileObjects;
    const coursesObjects = props.coursesObjects;
    //const currentCourse = coursesObjects[profileObjects.course]
    const currentCourse = (coursesObjects[profileObjects.course]);
    const { currentUser } = useAuth();
    //const [btnDisabled, setBtnDisabled] = useState(false)
    let logo = require('../../../assets/Images/my_projects.png').default;
    const projectObjects = props.projectObjects;
    //const projectKeys = Object.keys(projectObjects);
    //const arrayProjectObjects = Object.values(projectObjects)
    const [filteredProjects, setFilteredProjects] = useState('');
  
    //console.log(projects)

    // useEffect(()=>{
    //     setProfileObjects(props.profileObjects)
    // },props.profileObject)

    // useEffect(()=>{
    //     setCoursesObjects(props.coursesObjects)
    // },props.profileObject)
   

    //console.log(projectObjects);
    
    Object.filter = (obj, predicate) => 
    Object.keys(obj)
          .filter( key => predicate(obj[key]) )
          .reduce( (res, key) => (res[key] = obj[key], res), {} );


    let projects = []
    
    if(projectObjects) {
        projects = Object.filter(projectObjects, projectObject => projectObject.course === profileObjects.course)
    }

    const handleTagClick = (event) => {
        //console.log(event.target.name);
        //setFilteredProjects(projects);
        const values = (Object.filter(projects, project => project.tag === event.target.name))
        setFilteredProjects(values);
       
       
    }
    let filteredProjectsKeys = []
    
    if(filteredProjects) {
        filteredProjectsKeys = Object.keys(filteredProjects);
    }
    //console.log(filteredProjects)
    
   
    
    // let filtered = Object.filter(projectObjects, projectObject => projectObject.course === profileObjects.course)
    //console.log();
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
        <span style = {{fontWeight: "bold", fontSize: "1.2rem"}}>Click on any of these Topics to display its projects</span> <br />
            <div className = "col-3" style = {{maxWidth: "90vw"}}>
            <div className="btn-group-vertical" role="group" aria-label="Basic example">
            
        {currentCourse && <>
         
                {currentCourse.tag.map((tag,index) => {
                    return <button key = {index} name = {tag} onClick = {handleTagClick} type="button" className="btn btn-secondary">{tag}</button> 
                })}
            </>}
            {/* <button type="button" className="btn btn-secondary">Scratch</button>
            <button type="button" className="btn btn-secondary">Figma</button>
            <button type="button" className="btn btn-secondary">HTML</button>
            <button type="button" className="btn btn-secondary">CSS</button>
            <button type="button" className="btn btn-secondary">Bootstrap</button>
            <button type="button" className="btn btn-secondary">Python</button>
            <button type="button" className="btn btn-secondary">Django</button> */}
        </div>
            </div>
            <div className="col-9">
                <div className = "row" style = {{fontSize: "1.3rem", marginLeft: "20px", marginTop: "20px"}}>
                {filteredProjectsKeys.map(id => {
                return <IndiProject projectObjects = {filteredProjects} profileObjects = {profileObjects} currentUser = {currentUser} profileObjects = {profileObjects} currentCourse = {currentCourse} id = {id} key = {id}></IndiProject>
            })}
                </div>
            </div>
        </div>
        











        </div>
    )
}

export default MyProjects

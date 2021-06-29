import React from 'react'
import { useAuth } from '../../context/AuthContext';

const MyProjects = (props) => {
    //const [profileObjects, setProfileObjects] = useState('');
    //const [coursesObjects, setCoursesObjects] = useState('');
    const profileObjects = props.profileObjects;
    const coursesObjects = props.coursesObjects;
    //const currentCourse = coursesObjects[profileObjects.course]
    const currentCourse = (coursesObjects[profileObjects.course]);
    const { currentUser } = useAuth();
    let logo = require('../../assets/Images/my_projects.png').default;
    const projectObjects = props.projectObjects;
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
    return (
        <div className = "container">
        <div className = "row mt-5">
            <img src = {logo} alt = "dashboard" className = "mx-auto d-block" style = {{width: "70%"}} />
            {/* <h2 className = "text-center mb-4">My Projects</h2> */}
        </div>
        

        <div className ="row mt-5" style = {{fontSize: "1.3rem"}}>
            <span style ={{fontSize: "1.5rem"}}>Course:  {currentCourse && currentCourse.title}</span>
            {projects.map((project, index) => {
                return <div className = "mt-5" key = {index}>
                Title: {project.title} <br />
                Date Announced: {project.dateAnnounced}
                </div>
            })}
        </div>

       
            
            
        </div>
    )
}

export default MyProjects

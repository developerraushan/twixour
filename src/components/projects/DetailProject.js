import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { database } from '../../firebase/firebase';

const DetailProject = (props) => {
    const history = useHistory();
    const usersRef = database.ref(`users`);
    const [usersObjects, setUsersObjects] = useState('');
    const project = props.location.state.project;
    const currentCourse = props.location.state.course;
    const id = props.location.state.id;
    const [studentsKeys, setStudentsKeys] = useState('');
    

    useEffect(()=>{
        let isMounted = true
        usersRef.on('value', snapshot => {
            if(snapshot.val() != null) {
                setUsersObjects({
                    ...snapshot.val()
                })
            } 
        });
        return () => { isMounted = false };
    },[])

    useEffect(() => {   
        let isMounted = true  
        if(project.students) {
            setStudentsKeys(studentKeys => Object.keys(project.students.ids))
        }   
        return () => { isMounted = false };
    }, project.students)

    const handleBack = (event) => {
        event.preventDefault();
        history.push("/projects");
    }
    return (
        <div className = "container mt-3">
            <div className = "row mt-3">
                <div className = "col-3 mt-3">
                <button className = "btn btn-danger" onClick = {handleBack}>&laquo;Back</button>
                </div>
            </div>
            <div className = "row mt-5">
                <div className = "card">
                    <div className="title text-center">
                    Project Title: &nbsp;&nbsp;<strong>
                        {project.title}
                    </strong>
                    </div>
                <div className = "card-body">
                    <strong>Course</strong>: &nbsp; &nbsp; {currentCourse.title} <br />
                    <strong>Topic</strong>: &nbsp; &nbsp; {project.tag} <br />
                    <strong>Description:</strong> &nbsp;&nbsp;{project.description} <br/>
                    <strong>Date Announced</strong> &nbsp;&nbsp;{project.dateAnnounced} <br/>
                    <strong>Submission Date</strong> &nbsp;&nbsp;{project.submissionDate} <br/>
                    
                </div>
                {/* <Link to = {{
                    pathname: "/project/add-students",
                    state : {
                        id: id
                    }
                }} style = {{ textDecoration: 'none'}}>
                <span className = "btn btn-danger" >Add Students to this Project</span>
                </Link> */}
                </div>
            </div>
            {/* { project &&
            <div className = "card mt-3">
                <div className = "card-title text-center">
                    <strong>Students included in this project</strong>
                </div>
                <div className = "card-body">
                    <ul className = "list-group">
                        {Array.isArray(studentsKeys) ? 
                            <>
                        {studentsKeys.map(id => {
                            return <li className = "list-group-item" key = {id}>
                            {usersObjects ? <>{usersObjects[id].profile.first_name} &nbsp; {usersObjects[id].profile.last_name}</>: "Users don't exist"}
                            </li>
                        })}
                        </>
                        : "Students List is yet to be available"
                         
                        }
                    </ul>
                </div>
            </div>
            }   */}
            
        </div>
    )
}

export default DetailProject

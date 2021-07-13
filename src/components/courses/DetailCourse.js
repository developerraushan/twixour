import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { database } from '../../firebase/firebase';

const DetailCourse = (props) => {
    const usersRef = database.ref(`users`);
    const [usersObjects, setUsersObjects] = useState('');
    const course = props.location.state.course;
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
        if(course.students) {
            setStudentsKeys(studentKeys => Object.keys(course.students.ids))
        }   
        return () => { isMounted = false };
    }, course.students)
    

    return (
        <div className = "container mt-3">
            <div className = "card">
                <div className="title text-center">
                    Course Title: &nbsp;&nbsp;<strong>
                        {course.title}
                    </strong>
                </div>
                <div className = "card-body">
                    <strong>Duration:</strong> &nbsp;&nbsp;{course.duration} <br/>
                    <strong>Start Date:</strong> &nbsp;&nbsp;{course.startDate} <br/>
                    <strong>End Date:</strong> &nbsp;&nbsp;{course.endDate} <br/>
                    <strong>Cost:</strong> &nbsp;&nbsp; &#8377; {course.cost} <br/>
                </div>
                <Link to = {{
                    pathname: "/course/add-students",
                    state : {
                        id: id
                    }
                }} style = {{ textDecoration: 'none'}}>
                <span className = "btn" style = {{backgroundColor: "#4723d9", color: "white"}}>Add Students to this course</span>
                </Link>
            </div>
            { course &&
            <div className = "card mt-3">
                <div className = "card-title text-center">
                    <strong>List of students enrolled in the course</strong>
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
            }  
            
        </div>
    )
}

export default DetailCourse

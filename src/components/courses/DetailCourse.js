import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { database } from '../../firebase/firebase';

const DetailCourse = (props) => {
    const usersRef = database.ref(`users`);
    const [usersObjects, setUsersObjects] = useState('');
    const course = props.location.state.course;
    const id = props.location.state.id;
    const [studentsKeys, setStudentsKeys] = useState('');
    if(course.students) {
        setStudentsKeys(studentKeys => Object.keys(course.students.ids))
        // const studentsKeys = Object.keys(course.students.ids)
    }
    
    console.log("from detailcourse" ,studentsKeys)

    console.log(usersObjects);


    useEffect(()=>{
        usersRef.on('value', snapshot => {
            if(snapshot.val() != null) {
                setUsersObjects({
                    ...snapshot.val()
                })
            } 
        })
    },[])


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
                <span className = "btn btn-primary">Add Students to this course</span>
                </Link>
            </div>
                { course &&
            <div className = "card mt-3">
                <div className = "card-title text-center">
                    <strong>List of students enrolled in the course</strong>
                </div>
                <div className = "card-body">
                    <ul className = "list-group">
                        {course.students &&
                        <>
                        {studentsKeys.map(id => {
                            return <li className = "list-group-item" key = {id}>
                            {usersObjects ? <>{usersObjects[id].profile.first_name} &nbsp; {usersObjects[id].profile.last_name}</>: "Users don't exist"}
                            </li>
                        })}
                        </> 
                        }
                    </ul>
                </div>
            </div>
            }
            
        </div>
    )
}

export default DetailCourse

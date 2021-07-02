import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { database } from '../../firebase/firebase';
import Course from './Course';

const Courses = () => {
    const [coursesObjects, setCoursesObjects] = useState('');
    const coursesRef = database.ref(`courses`);
    const courses = Object.keys(coursesObjects);
    
    useEffect(()=>{
        let isMounted = true
        coursesRef.on('value', snapshot => {
            if(snapshot.val() != null) {
                setCoursesObjects({
                    ...snapshot.val()
                })
                
            }
        });
        return () => { isMounted = false };
    },[])
    
    return (
        <div className = "container mt-3">
            <Link to = "/add-course" style = {{ textDecoration: 'none' }}>
            <span className = "btn btn-danger">Add Course</span>
            </Link>

            {courses.map(id => {
                return <Course coursesObjects = {coursesObjects} key = {id} id = {id}  />
            })}
            
        </div>
    )
}

export default Courses

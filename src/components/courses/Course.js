import React from 'react'
import { Link } from 'react-router-dom';
const Course = (props) => {
    const courses = props.coursesObjects;
    const id = props.id;
    
    return (
        <div className = "container mt-3">
            <div className = "card">
                <div className="title text-center">
                    Course Title: &nbsp;&nbsp;<strong>
                        <Link to = {{
                            pathname: "/course-detail",
                            state: {
                                course: courses[id],
                                id: id
                            }
                        }} style = {{ textDecoration: 'none'}}>
                        {courses[id].title}
                        </Link>
                    </strong>
                </div>
                <div className = "card-body">
                    <strong>Duration:</strong> &nbsp;&nbsp;{courses[id].duration} <br/>
                    <strong>Start Date:</strong> &nbsp;&nbsp;{courses[id].startDate} <br/>
                    <strong>End Date:</strong> &nbsp;&nbsp;{courses[id].endDate} <br/>
                    <strong>Cost:</strong> &nbsp;&nbsp; &#8377; {courses[id].cost} <br/>
                </div>
            </div>
            
        </div>
    )
}

export default Course

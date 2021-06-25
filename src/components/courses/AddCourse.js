import React, { useState, useEffect, useRef } from 'react'
import { database } from '../../firebase/firebase';
import { useHistory } from 'react-router';

const AddCourse = (props) => {
    const history = useHistory();
    const [inidvidualCourse, setindividualCourses] = useState(
        {
            title: '',
            duration: '',
            startDate: '',
            endDate: '',
            cost: '',
        }
    );
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const coursesRef = database.ref(`courses`);
    const handleChange = (event) => {
        const {name, value} = event.target
        setindividualCourses(inidvidualCourse => ({...inidvidualCourse, [name]: value}))
        
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        try {
            setError('');
            setLoading(true);
            coursesRef.push({
                title: inidvidualCourse.title ,
                duration: inidvidualCourse.duration ,
                startDate: inidvidualCourse.startDate ,
                endDate: inidvidualCourse.endDate ,
                cost: inidvidualCourse.cost,
                
            });
            history.push("/courses");
        } catch {
            setError("Couldn't create User Profile")
        }
        setLoading(false);    
    }

    return (
        <div className = "container mt-3">
        {error && <div className = "alert alert-danger">{error}</div>}
            <form onSubmit = {handleSubmit}>
                <div className = "mb-3" id = "title">
                    <label className = "form-label"> Title </label>
                    <input name = "title" className="form-control"  type = "text"  required onChange = {handleChange} value = {inidvidualCourse.title} />
                </div>

                <div className = "mb-3" id = "duration">
                    <label className = "form-label"> Duration </label>
                    <input name = "duration" className="form-control"  type = "text"  required onChange = {handleChange} />
                </div>

                <div className = "mb-3" id = "startDate">
                    <label className = "form-label"> Start Date </label>
                    <input name = "startDate" className="form-control"  type = "text"  required onChange = {handleChange} />
                </div>

                <div className = "mb-3" id = "endDate">
                    <label className = "form-label"> End Date </label>
                    <input name = "endDate" className="form-control"  type = "text"  required onChange = {handleChange} />
                </div>

                <div className = "mb-3" id = "cost">
                    <label className = "form-label"> cost </label>
                    <input name = "cost" className="form-control"  type = "text"  required onChange = {handleChange} />
                </div>

                <button disabled = {loading} className = "btn btn-primary mt-3 w-100" type = "submit">Create Course</button>
            </form>
        </div>
    )
}

export default AddCourse

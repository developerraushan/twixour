import React, { useState } from 'react'
import { database } from '../../firebase/firebase';
import { useHistory } from 'react-router';
import Select from 'react-select'

const AddCourse = (props) => {
    const history = useHistory();
    const options = [
        { value: 'Scratch', label: 'Scratch' },
        { value: 'Figma', label: 'Figma' },
        { value: 'Html', label: 'Html' },
        { value: 'CSS', label: 'CSS' },
        { value: 'Bootstrap', label: 'Bootstrap' },
        { value: 'Python', label: 'Python' },
        { value: 'Django', label: 'Django' }
      ]
    //const topicsRef = useRef();
    const [inidvidualCourse, setindividualCourses] = useState(
        {
            title: '',
            duration: '',
            startDate: '',
            endDate: '',
            cost: '',
            students: [],
            tag: [],
        }
    );
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const coursesRef = database.ref(`courses`);
    const handleChange = (event) => {
        const {name, value} = event.target
        setindividualCourses(inidvidualCourse => ({...inidvidualCourse, [name]: value}))
        
        
    }
    const handleSelectChange = (event) => {
        const getValue = (Array.isArray(event)? event.map(x => x.label):[]);
        console.log(getValue);
        setindividualCourses(inidvidualCourse => ({...inidvidualCourse, tag: getValue}))
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
                students: inidvidualCourse.students,
                tag: inidvidualCourse.tag,
                
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

                <div className = "mb-3" id = "topic">
                    <label className = "form-label"> Topic </label>
                    <Select  isMulti options={options} onChange = {handleSelectChange} />
                    {/* <select multiple name = "tag" className = "form-select" ref = {topicsRef} aria-label = "multiple select example" required >
                        
                        <option  value = "Scratch">Scratch</option>
                        <option value = "Figma">Figma</option>
                        <option value = "Html">Html</option>
                        <option value = "CSS">CSS</option>
                        <option value = "Bootstrap">Bootstrap</option>
                        <option value = "Python">Python</option>
                        <option value = "Django">Django</option>
                    </select> */}
                </div>

                <button disabled = {loading} className = "btn btn-danger mt-3 w-100" type = "submit">Create Course</button>
            </form>
        </div>
    )
}

export default AddCourse

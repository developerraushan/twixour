import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { database } from '../../firebase/firebase';

const AddProject = () => {
    const history = useHistory();
    const [inidvidualProject, setindividualProject] = useState(
        {
            title: '',
            dateAnnounced: '',
            submissionDate: '',
            endDate: '',
            description: '',
            students: [],
        }
    );
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const projectsRef = database.ref(`projects`);
    const handleChange = (event) => {
        const {name, value} = event.target
        setindividualProject(inidvidualProject => ({...inidvidualProject, [name]: value}))
        
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        try {
            setError('');
            setLoading(true);
            projectsRef.push({
                title: inidvidualProject.title ,
                dateAnnounced: inidvidualProject.dateAnnounced ,
                submissionDate: inidvidualProject.submissionDate ,
                endDate: inidvidualProject.endDate ,
                description: inidvidualProject.description,
                students: inidvidualProject.students,
                
            });
            history.push("/courses");
        } catch {
            setError("Couldn't create User Profile")
        }
        setLoading(false);    
    }
    return (
        <div className = "container mt-3">
        <div className = "row" style = {{fontSize: "1.6rem"}}><b>Create a New Project</b></div>
        {error && <div className = "alert alert-danger">{error}</div>}
            <form className = "mt-3" onSubmit = {handleSubmit}>
                <div className = "mb-3" id = "title">
                    <label className = "form-label"> Title </label>
                    <input name = "title" className="form-control"  type = "text"  required onChange = {handleChange} value = {inidvidualProject.title} />
                </div>

                <div className = "mb-3" id = "duration">
                    <label className = "form-label"> Date Announced </label>
                    <input name = "duration" className="form-control"  type = "text"  required onChange = {handleChange} />
                </div>

                <div className = "mb-3" id = "startDate">
                    <label className = "form-label"> Submission Date </label>
                    <input name = "startDate" className="form-control"  type = "text"  required onChange = {handleChange} />
                </div>

                <div className = "mb-3" id = "endDate">
                    <label className = "form-label"> End Date </label>
                    <input name = "endDate" className="form-control"  type = "text"  required onChange = {handleChange} />
                </div>

                <div className = "mb-3" id = "cost">
                    <label className = "form-label"> Description </label>
                    <input name = "cost" className="form-control"  type = "text"  required onChange = {handleChange} />
                </div>

                <button disabled = {loading} className = "btn btn-primary mt-3 w-100" type = "submit">Create Course</button>
            </form>
        </div>
    )
}

export default AddProject

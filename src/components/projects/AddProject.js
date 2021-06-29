import React, { useRef, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { database } from '../../firebase/firebase';

const AddProject = (props) => {
    const history = useHistory();
    const coursesObjects = props.coursesObjects;
    const courses = Object.keys(coursesObjects);
    const m_courseRef = useRef();
    const tagRef = useRef();
    const [inidvidualProject, setindividualProject] = useState(
        {
            title: '',
            dateAnnounced: '',
            submissionDate: '',
            endDate: '',
            description: '',
            tag: '',
            course: '',
            students: [],
        }
    );
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const projectsRef = database.ref(`projects`);
    const handleChange = (event) => {
        const {name, value} = event.target;
        setindividualProject(inidvidualProject => ({...inidvidualProject, [name]: value}))
        
    }
    //console.log(m_courseRef.current);
    const handleSubmit = (event) => {
        event.preventDefault();
        
        try {
            setError('');
            setLoading(true);
            projectsRef.push({
                title: inidvidualProject.title ,
                dateAnnounced: inidvidualProject.dateAnnounced ,
                submissionDate: inidvidualProject.submissionDate ,
                tag: tagRef.current.value,
                description: inidvidualProject.description,
                course: m_courseRef.current.value,
                students: inidvidualProject.students,
                
            });
            history.push("/projects");
        } catch {
            setError("Couldn't create new Project")
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

                <div className = "mb-3" id = "tag">
                    <label className = "form-label"> Tag </label>
                    <select name = "tag" className = "form-select" ref = {tagRef}  required >
                        
                        <option  value = "Scratch">Scratch</option>
                        <option value = "Figma">Figma</option>
                        <option value = "Html">Html</option>
                        <option value = "CSS">CSS</option>
                        <option value = "Bootstrap">Bootstrap</option>
                        <option value = "Python">Python</option>
                        <option value = "Django">Django</option>
                    </select>
                </div>


                <div className = "mb-3" id = "course">
                    <label className = "form-label"> Select Course </label>
                    <select  name = "course" className = "form-select"  ref = {m_courseRef} required >
                    
                        {courses.map(id => {
                            return <option value = {id} key = {id}>{coursesObjects[id].title}</option>
                        })}
                                
                    </select>
                </div>



                <div className = "mb-3" id = "dateAnnounced">
                    <label className = "form-label"> Date Announced </label>
                    <input name = "dateAnnounced" className="form-control"  type = "text"  required onChange = {handleChange} />
                </div>

                <div className = "mb-3" id = "submissionDate">
                    <label className = "form-label"> Submission Date </label>
                    <input name = "submissionDate" className="form-control"  type = "text"  required onChange = {handleChange} />
                </div>

                {/* <div className = "mb-3" id = "endDate">
                    <label className = "form-label"> End Date </label>
                    <input name = "endDate" className="form-control"  type = "text"  required onChange = {handleChange} />
                </div> */}

                <div className = "mb-3" id = "cost">
                    <label className = "form-label"> Description </label>
                    <input name = "description" className="form-control"  type = "text"  required onChange = {handleChange} />
                </div>

                <button disabled = {loading} className = "btn btn-primary mt-3 w-100" type = "submit">Create Project</button>
            </form>
        </div>
    )
}

export default AddProject

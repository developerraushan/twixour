import React, { useState } from 'react'
import { database } from '../../../firebase/firebase';

const IndiProjectDetail = (props) => {
    const [disabledStatus, setDisabledStatus] = useState('');
    const currentUser = props.currentUser;
    const usersRef = database.ref(`users`);
    const project = props.location.state.project;
    const projectId = props.location.state.id;
    const currentCourse = props.location.state.currentCourse;
    const profileObjects = props.profileObjects;
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(event.target)
    }
    const handleChange = (event) => {
        console.log(event.target.value)
    }
    const pathname = ""
    //console.log(props.currentUser.uid)
    return (
        <div className = "container">
            <div className = "row mt-3" style = {{fontSize: "1.1rem"}}>
                <div className = "col-7"></div>
                <div className = "col-2">Course: </div>
                <div className = "col-3" style = {{fontWeight: "bold"}}>{currentCourse.title}</div>
            </div>
            <div className = "row mt-5" style = {{fontSize: "1.8rem", fontWeight: "bold"}}>
                {project.title}
            </div>

            <div className = "row mt-3" style = {{fontSize: "1.1rem"}}>
                <div className = "col-4">From Topic: </div>
                <div className = "col-4">{project.tag}</div>
            </div>

            <div className = "row mt-3" style = {{fontSize: "1.1rem"}}>
                <div className = "col-4">Announcement Date: </div>
                <div className = "col-4">{project.dateAnnounced}</div>
            </div>

            <div className = "row mt-3" style = {{fontSize: "1.1rem"}}>
                <div className = "col-4">Submission Date: </div>
                <div className = "col-4">{project.submissionDate}</div>
            </div>

            <div className = "row mt-3" style = {{fontSize: "1.1rem"}}>
                <div className = "col-4">Description of this project: </div>
                <div className = "col-8">{project.description}</div>
            </div>

            <div className = "row mt-5" style = {{fontSize: "1.1rem"}}>
                <form onSubmit = {handleSubmit}>
                <div class="mb-3">
                    <label htmlFor="exampleInputEmail1" class="form-label">Submit File</label>
                    <input name = "file" type="file" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange = {handleChange} />
                    <button type="submit" className="mt-3 btn btn-primary">Submit</button>
                </div>
                </form>
            </div>
            
        </div>
    )
}

export default IndiProjectDetail

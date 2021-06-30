import React, { useState } from 'react'
import { database } from '../../../firebase/firebase';
import { storage } from '../../../firebase/firebase';

const IndiProjectDetail = (props) => {
    const [file, setFile] = useState(null);
    const [visibleStatus, setVisibleStatus] = useState(false);
    const currentUser = props.currentUser;
    const usersRef = database.ref(`users`);
    const project = props.location.state.project;
    const projectId = props.location.state.id;
    const currentCourse = props.location.state.currentCourse;
    const profileObjects = props.profileObjects;
    
    const handleChange = (event) => {
        if(event.target.files[0]) {
            setFile(event.target.files[0]);
        }
    }
    const addProjectToStudent = (url)=> {
        try {
            usersRef.child(currentUser.uid).child(`projects`).child(projectId).push(
                {
                    projectId: projectId,
                    urlPath: url,
                    submit: true
                }
            );
        } catch {
            //console.log("what")
        }
    }
    const handleSubmit = (event) => {
        const uploadTask = storage.ref(`files/${file.name}`).put(file);
        uploadTask.on(
            "state_changed",
            snapshot => {},
            error => {
                console.log(error);
            },
            () => {
                storage
                    .ref("files")
                    .child(file.name)
                    .getDownloadURL()
                    .then(url => {
                        // the code to add projects
                        //console.log(url);
                        addProjectToStudent(url);
                        setVisibleStatus(true);
                    })
            }
        )

    }
    //console.log(file);
    //const pathname = ""
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
                
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Submit File</label>
                    <input name = "file" type="file" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange = {handleChange} required />
                    <button onClick = {handleSubmit} className="mt-3 btn btn-primary">Submit</button>
                    { visibleStatus &&
                    <span style = {{marginLeft: "40px"}}>Successfully Submited....</span>
                    }
                </div>
                
            </div>
            
        </div>
    )
}

export default IndiProjectDetail

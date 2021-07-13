import React, { useState, useEffect } from 'react'
import { database } from '../../../firebase/firebase';
import { storage } from '../../../firebase/firebase';
import Progress from '../../../helper_component/Progress';
import { useHistory } from 'react-router';

const IndiProjectDetail = (props) => {
    const history = useHistory();
    const [file, setFile] = useState(null);
    const [disabledStatus, setDisabledStatus] = useState(false);
    const [progressValue, setProgressValue] = useState(0);
    const [currentProjectObject, setCurrentProjectObject] = useState('');
    const currentUser = props.currentUser;
    const usersRef = database.ref(`users`);
    const project = props.location.state.project;
    const projectId = props.location.state.id;
    const currentCourse = props.location.state.currentCourse;
    const profileObjects = props.profileObjects;
    const projectRef = usersRef.child(currentUser.uid).child(`projects`).child(projectId);
    const currentProjectKeys = Object.keys(currentProjectObject);
    const handleChange = (event) => {
        if(event.target.files[0]) {
            setFile(event.target.files[0]);
        }
    }
    const addProjectToStudent = (url, fileName)=> {
        try {
            usersRef.child(currentUser.uid).child(`projects`).child(projectId).push(
                {
                    projectId: projectId,
                    urlPath: url,
                    submit: true,
                    fileName: fileName
                }
            );
        } catch {
            
        }
    }
    let value = 0
    const handleSubmit = (event) => {
        setDisabledStatus(true);
        const uploadTask = storage.ref(`files/${file.name}`).put(file);
        uploadTask.on(
            "state_changed",
            snapshot => {   
                setProgressValue(Math.trunc(snapshot.bytesTransferred /snapshot.totalBytes * 100))
                 
                
            },
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
                        
                        value = 100;
                        setProgressValue(value)
                        addProjectToStudent(url, file.name);
                        
                    })
            }
        )

    }
    useEffect(()=>{
        projectRef.on('value', snapshot => {
            if(snapshot.val() != null) {
                setCurrentProjectObject({
                    ...snapshot.val()
                })
            } 
        })
        },[])
    
    // const donwloadProject = (event) => {
    //     event.preventDefault();
    //     const urlPath = currentProjectObject[event.target.name].urlPath;
    //     const fileName = currentProjectObject[event.target.name].fileName;
    //    
    //     const newURL = "/o/files%2FE11357_X99-DELUXE_II_UM_WEB.pdf?alt=media&token=6192e0fc-94a9-4398-ae91-3f6173c45c3c"
    //     let xhr = new XMLHttpRequest();
    //     xhr.responseType = 'blob';
    //     xhr.onload = (event) => {
    //         let blob = xhr.response;
    //     };
    //     xhr.open('GET', newURL);
    //     xhr.send();

    //     // const a = document.createElement('a')
    //     // a.href = urlPath
    //     // a.download = "project file"
    //     // document.body.appendChild(a)
    //     // a.click()
    //     // document.body.removeChild(a)
        
    // }
    const handleBack = (event) => {
        history.push("/my-projects")
    }
    return (
        <div className = "container">
            <div className = "row mt-3" style = {{fontWeight: "bold" ,fontSize: "1.8rem", color: "#dc3546"}}>
                <div className = "col-8">
                    <button className = "btn " onClick = {handleBack} style = {{backgroundColor: "#4723d9", color: "white"}}>&laquo;Back</button>
                </div>
                
                <div className = "col-3">{currentCourse.title}</div>
                <div className = "col-1"></div>
            </div>
            <div className = "row mt-5" >
               <h2 style = {{fontSize: "1.9rem", fontWeight: "bold"}}> {project.title} <span className = "badge rounded-pill bg-danger">{project.tag}</span></h2>
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
                
                {currentProjectObject ? 
                    <>
                        {currentProjectKeys.map(id => {
                            return   <a key = {id} className = "btn " href = {currentProjectObject[id].urlPath} download style = {{backgroundColor: "#4723d9", color: "white"}}>Download My Project</a>
                             
                        })}
                    </>
                : 
                <div className="mb-3">
                    {disabledStatus && <Progress  completed = {progressValue} bgColor = '#6a1b9a' />}
                    <label htmlFor="exampleInputEmail1" className="form-label">Submit File</label>
                    <input name = "file" type="file" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange = {handleChange} required />
                    <button disabled = {disabledStatus} onClick = {handleSubmit} className="mt-3 btn " style = {{backgroundColor: "#4723d9", color: "white"}}>Submit</button>
                    
                    
                    
                </div>}
                
            </div>
            
        </div>
    )
}

export default IndiProjectDetail



// <button key = {id} name = {id} onClick = {donwloadProject} className = "btn btn-danger">Download My Submission</button>



// <a key = {id} className = "btn btn-danger" href = {currentProjectObject[id].urlPath} download>Download My Project</a>


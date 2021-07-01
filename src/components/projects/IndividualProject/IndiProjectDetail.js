import React, { useState, useEffect } from 'react'
import { database } from '../../../firebase/firebase';
import { storage } from '../../../firebase/firebase';
import Progress from '../../../helper_component/Progress';

const IndiProjectDetail = (props) => {
    const [file, setFile] = useState(null);
    const [visibleStatus, setVisibleStatus] = useState(false);
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
            //console.log("what")
        }
    }
    let value = 0
    const handleSubmit = (event) => {
        const uploadTask = storage.ref(`files/${file.name}`).put(file);
        uploadTask.on(
            "state_changed",
            snapshot => {   
                setProgressValue(Math.trunc(snapshot.bytesTransferred /snapshot.totalBytes * 100))
                 
                //console.log("progress report",progressValue);
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
                        //console.log(url);
                        value = 100;
                        setProgressValue(value)
                        addProjectToStudent(url, file.name);
                        setVisibleStatus(true);
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
    //console.log(currentProjectObject);
    const donwloadProject = (event) => {
        event.preventDefault();
        const urlPath = currentProjectObject[event.target.name].urlPath;
        const fileName = currentProjectObject[event.target.name].fileName;
        console.log("button work", urlPath);
        console.log("button file", fileName);
        const newURL = "/o/files%2FE11357_X99-DELUXE_II_UM_WEB.pdf?alt=media&token=6192e0fc-94a9-4398-ae91-3f6173c45c3c"
        let xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = (event) => {
            let blob = xhr.response;
        };
        xhr.open('GET', newURL);
        xhr.send();

        // const a = document.createElement('a')
        // a.href = urlPath
        // a.download = "project file"
        // document.body.appendChild(a)
        // a.click()
        // document.body.removeChild(a)
        
    }
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
                
                {currentProjectObject ? 
                    <>
                        {currentProjectKeys.map(id => {
                            return   <a key = {id} className = "btn btn-danger" href = "https://firebasestorage.googleapis.com/v0/b/twixour-f6470.appspot.com/o/favicon_io.zip?alt=media&token=9e9fc21a-98dc-4395-bfe9-cefe18edeb6a" download>Download My Project</a>
                             
                        })}
                    </>
                : 
                <div className="mb-3">
                    <Progress completed = {progressValue} bgColor = '#6a1b9a' />
                    <label htmlFor="exampleInputEmail1" className="form-label">Submit File</label>
                    <input name = "file" type="file" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange = {handleChange} required />
                    <button onClick = {handleSubmit} className="mt-3 btn btn-primary">Submit</button>
                    
                    { visibleStatus &&
                    <span style = {{marginLeft: "40px"}}>Successfully Submited....</span>
                    }
                    
                </div>}
                
            </div>
            
        </div>
    )
}

export default IndiProjectDetail





// <button key = {id} name = {id} onClick = {donwloadProject} className = "btn btn-danger">Download My Submission</button>

// <a key = {id} className = "btn btn-danger" href = {currentProjectObject[id].urlPath} download>Download My Project</a>



//https://firebasestorage.googleapis.com/v0/b/twixour-f6470.appspot.com/o/favicon_io.zip?alt=media&token=9e9fc21a-98dc-4395-bfe9-cefe18edeb6a


//https://firebasestorage.googleapis.com/v0/b/twixour-f6470.appspot.com/o/files%2FE11357_X99-DELUXE_II_UM_WEB.pdf?alt=media&token=4b4fc810-b6b9-42af-a49d-98aa23e710e2


//https://firebasestorage.googleapis.com/v0/b/twixour-f6470.appspot.com/o/favicon_io%20(1).zip?alt=media&token=3be0f2f9-ad7d-441a-a7a7-2d9ef8792128
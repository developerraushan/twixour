import React, { useState } from 'react'

const IndiProjectDetail = (props) => {
    const [disabledStatus, setDisabledStatus] = useState('');
    const project = props.location.state.project;
    const projectId = props.location.state.id;
    const currentCourse = props.location.state.currentCourse;
    const handleClick = (event) => {
        event.preventDefault();
        console.log(event.target.name)
    }
    
    return (
        <div className = "container">
            <div className = "row mt-3" style = {{fontSize: "1.1rem"}}>
                <div className = "col-7"></div>
                <div className = "col-2">Course: </div>
                <div className = "col-3" style = {{fontWeight: "bold"}}>{currentCourse.title}</div>
            </div>
            <div className = "row mt-5">
                <div className = "col-5" style = {{fontSize: "1.8rem", fontWeight: "bold"}}>
                    {project.title}
                </div>
                <div className = "col-4"></div>
                <div className = "col-3">
                <button name = {projectId} onClick = {handleClick} className = "btn btn-primary">Start</button>
                </div>
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
                <button className = "btn btn-primary">More on my work</button>
            </div>
            
        </div>
    )
}

export default IndiProjectDetail

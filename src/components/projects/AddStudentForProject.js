import React, { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom';
import { database } from '../../firebase/firebase';

const AddStudentForProject = (props) => {
    const history = useHistory();
    const id = props.location.state.id;
    
    const [multiValue, setMultiValue] = useState([]);
    const [userObjects, setUserObjects] = useState('');
    const usersRef = database.ref(`users`);
    const usersKeys = Object.keys(userObjects);
    const projectsRef = database.ref(`projects`)

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    useEffect(()=>{
        usersRef.on('value', snapshot => {
            if(snapshot.val() != null) {
                setUserObjects({
                    ...snapshot.val()
                })
                
            }
        })
    },[])
    const handleChange = (event) => {
        const {name, value } = event.target;
        //setMultiValue(multiValue => ({...multiValue, [name]: value}))
        // setMultiValue(Array.isArray(event.target.selectedOptions) ? event.target.selectedOptions.map(x => x.value) : [])

        // setMultiValue([].slice.call(event.target.selectedOptions))
        
        setMultiValue(multivalue => ({...multiValue, [name]: value}))
        
    }
   const onSubmit = (event) => {

       event.preventDefault();
      




       try {
        setError('');
        setLoading(true);
        projectsRef.child(id).child(`students`).set({
            ids: multiValue 
        });
        history.push("/projects");
    } catch {
        setError("Couldn't create User Profile")
    }
    setLoading(false);


       
   }
    
    return (
        <div className = "container mt-3">
        <form onSubmit = {onSubmit}>
            <div className = "row mt-3">
            {error && <div className="alert alert-danger">{error}</div>}
        {userObjects ? <>
            {usersKeys.map(id => {
                return <div className = "form-check mt-3" key = {id} >
                    <input name = {id} onChange = {handleChange} className = "form-check-input" id = {id} type = "checkbox" value = {id} />
                    <label className = "form-check-label" htmlFor = {id}>{userObjects[id].profile.first_name} &nbsp;  {userObjects[id].profile.last_name}</label>
                </div>
            })}
        </>
        : "Students doesn't exits"
        }



        {/* {userObjects ?
        <div>
            <select name = "multiValue"  onChange = {handleChange} className = "form-select" size = "10" multiple aria-label = "multiple select example">
                {usersKeys.map(id => {
                    return <option key = {id}>{id}</option>
                })}
            </select>
        </div> 
        : "Students don't exist"} */}
        
            <button disabled = {loading} className = "btn mt-3" type = "submit" style = {{backgroundColor: "#4723d9", color: "white"}}>Add</button>
            </div>
        </form>
        </div>
    )
}

export default AddStudentForProject

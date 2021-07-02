import React, { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom';
import { database } from '../../firebase/firebase';

const AddStudents = (props) => {
    const history = useHistory();
    const id = props.location.state.id;
    
    const [multiValue, setMultiValue] = useState([]);
    const [userObjects, setUserObjects] = useState('');
    const usersRef = database.ref(`users`);
    const usersKeys = Object.keys(userObjects);
    const coursesRef = database.ref(`courses`)

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
        coursesRef.child(id).child(`students`).set({
            ids: multiValue 
        });
        history.push("/courses");
    } catch {
        setError("Couldn't create User Profile")
    }
    setLoading(false);


       
   }
    
    return (
        <div className = "container mt-3">
        <form onSubmit = {onSubmit}>
        {error && <div className="alert alert-danger">{error}</div>}
        {userObjects ? <>
            {usersKeys.map(id => {
                return <div className = "form-check" key = {id} >
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
        
            <button disabled = {loading} className = "btn btn-danger mt-3" type = "submit">Add</button>
        </form>
        </div>
    )
}

export default AddStudents

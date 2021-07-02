import React, { useRef, useState } from 'react';
import { database } from '../../firebase/firebase';
import { useAuth } from '../../context/AuthContext';
import { useHistory } from 'react-router-dom';

const CreateProfile = (props) => {
    
    const usersRef = database.ref(`users`);
    const { currentUser } = useAuth();
    //const profileURL = usersRef.child(currentUser.uid).child(`profile`);
    const coursesObjects = props.coursesObjects;
    const courses = Object.keys(coursesObjects);
    const history = useHistory();

    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const photoURLRef = useRef();
    const genderRef = useRef();
    const countryRef = useRef();
    const stateRef = useRef();
    const pincodeRef = useRef();
    const addressRef = useRef();
    const cityRef = useRef();
    const phoneRef = useRef();
    const courseAppliedRef = useRef();

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const profileCreator = (event) => {
        event.preventDefault();
        
        try {
            setError('');
            setLoading(true);
            usersRef.child(currentUser.uid).child(`profile`).set({
                id: currentUser.uid,
                photoURL: photoURLRef.current.value,
                first_name: firstNameRef.current.value,
                last_name: lastNameRef.current.value,
                gender: genderRef.current.value,
                phone: phoneRef.current.value,
                address: addressRef.current.value,
                city: cityRef.current.value,
                pincode: pincodeRef.current.value,
                state: stateRef.current.value,
                country: countryRef.current.value,
                email: currentUser.email,
                course: courseAppliedRef.current.value
            });
            history.push("/");
        } catch {
            setError("Couldn't create User Profile")
        }
        setLoading(false);
    }
    //const course1 = courses[0]
    console.log("create profile first time",coursesObjects[courses[2]].title);
    return (
        <> 
            <div className="card">
                <div className="card-body">
                    <h2 className = "text-center mb-4">Create Profile</h2>
                    {error && <div className = "alert alert-danger">{error}</div>}
                    <form onSubmit = {profileCreator}>
                        <div className = "mb-3" id = "first_name">
                            <label className = "form-label">First Name </label>
                            <input className="form-control"  type = "text" ref = {firstNameRef} required   />
                        </div>

                        <div className = "mb-3" id = "last_name">
                            <label className = "form-label">Last Name </label>
                            <input className="form-control" type = "text" ref = {lastNameRef} required   />
                        </div>

                        <div className = "mb-3" id = "profile-photo">
                            <label className = "form-label">Profile Photo</label>
                            <input className="form-control"  type = "text" ref = {photoURLRef} required />
                        </div>

                        <div className = "mb-3" id = "gender">
                            <label className = "form-label"> Gender </label>
                            <select className = "form-select" ref = {genderRef} required >
                                <option value = "Male">Male</option>
                                <option value = "Female">Female</option>
                            </select>
                        </div>

                        <div className = "mb-3" id = "course">
                            <label className = "form-label"> Select Course </label>
                            <select className = "form-select" ref = {courseAppliedRef} required >
                            {courses.map(id => {
                                return <option value = {id} key = {id}>{coursesObjects[id].title}</option>
                            })}
                                
                            </select>
                        </div>

                        <div className = "mb-3" id = "phone">
                            <label className = "form-label"> Phone </label>
                            <input className="form-control"  type = "text" ref = {phoneRef} required  />
                        </div>

                        <div className = "mb-3" id = "address">
                            <label className = "form-label"> Address </label>
                            <input className="form-control"  type = "text" ref = {addressRef} required />
                        </div>

                        <div className = "mb-3" id = "city">
                            <label className = "form-label"> City </label>
                            <input className="form-control"  type = "text" ref = {cityRef} required  />
                        </div>

                        <div className = "mb-3" id = "pincode">
                            <label className = "form-label"> Pincode </label>
                            <input className="form-control"  type = "text" ref = {pincodeRef} required  />
                        </div>

                        <div className = "mb-3" id = "state">
                            <label className = "form-label"> State </label>
                            <input className="form-control"  type = "text" ref = {stateRef} required />
                        </div>

                        <div className = "mb-3" id = "country">
                            <label className = "form-label"> Country </label>
                            <input className="form-control"  type = "text" ref = {countryRef} required />
                        </div>

                        <button disabled= {loading} type = "submit" className = "btn btn-primary">Create Profile</button>

                    </form>
                </div>
            </div>
        </>      
    )
}

export default CreateProfile;

import React, { useRef, useState, useEffect } from 'react';
import { database } from '../../firebase/firebase';
import { useAuth } from '../../context/AuthContext';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Progress from '../../helper_component/Progress';
import Expire from '../../helper_component/Expire';
import MakeVisible from '../../helper_component/MakeVisible';
import Select from 'react-select';

const UpdateProfile = (props) => {
    const [profileObjects, setProfileObjects] = useState('');
    
    const usersRef = database.ref(`users`);
    
    const { currentUser } = useAuth();
    const profileURL = usersRef.child(currentUser.uid).child(`profile`);
    const coursesObjects = props.coursesObjects;
    const courses = Object.keys(coursesObjects);
    const history = useHistory();

    const [courseFee, setCourseFee] = useState('');
    let dValue = {value: "", label: ""}
    if(profileObjects) {
        dValue = {value: profileObjects.courseFee, label: profileObjects.courseFee}
        
    }
    
    const feeModeOptions = [
        {value: "10000", label: "10000 UC"},
        {value: "11000", label: "11000 UC"},
        {value: "12000", label: "12000 UC"},
        {value: "5000", label: "5000 PD"},
        {value: "4500", label: "4500 PD"},
        {value: "8800", label: "8800 OG"}
    ];

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

    useEffect(()=>{
        profileURL.on('value', snapshot => {
            if(snapshot.val() != null) {
                setProfileObjects({
                    ...snapshot.val()
                })
            } 
        })
    },[])
    
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
                course: courseAppliedRef.current.value,
                courseFee: courseFee,
            });
            history.push("/");
        } catch {
            setError("Couldn't create User Profile")
        }
        setLoading(false);
    }
    const handleSelectPayChange = (event) => {
        const getValue = event.value;
        setCourseFee(getValue);
    }
    console.log(dValue)
    return (
        <>         
           {!profileObjects ? 
           <> Loading... <Progress completed = {0} bgColor = "#6a1b9a"  /> </> : <Expire delay = "900">  <Progress completed = {100} bgColor = "#6a1b9a" />  </Expire>      }
           <MakeVisible delay="2000">
           <Link to = "/update-credentials" className = "btn btn-danger w-100 mt-5">Update Credential</Link>
                <div className="card mt-5">
                <img src={profileObjects && profileObjects.photoURL} className="card-img-top" alt="..."  style = {{width: "40%"}} />
                    <div className="card-body">
                    
                        
                            {error && <div className = "alert alert-danger">{error}</div>}
                        <form onSubmit = {profileCreator}>
                            <div className = "mb-3" id = "first_name">
                                <label className = "form-label">First Name </label>
                                <input className="form-control"  type = "text" ref = {firstNameRef} required defaultValue = {profileObjects && profileObjects.first_name}  />
                            </div>

                            <div className = "mb-3" id = "last_name">
                                <label className = "form-label">Last Name </label>
                                <input className="form-control" type = "text" ref = {lastNameRef} required defaultValue = {profileObjects && profileObjects.last_name}  />
                            </div>

                            <div className = "mb-3" id = "courseFeePayOption">
                                <label className = "form-label">Course Fee Pay Option</label>
                                <Select defaultValue = {dValue} options = {feeModeOptions} onChange = {handleSelectPayChange} />
                            </div>

                            <div className = "mb-3" id = "profile-photo">
                                <label className = "form-label">Profile Photo</label>
                                <input className="form-control"  type = "text" ref = {photoURLRef} required defaultValue = {profileObjects && profileObjects.photoURL}/>
                            </div>

                            <div className = "mb-3" id = "gender">
                                <label className = "form-label"> Gender </label>
                                <select className = "form-select" ref = {genderRef} required defaultValue = {profileObjects && profileObjects.gender}>
                                    <option value = "Male">Male</option>
                                    <option value = "Female">Female</option>
                                </select>
                            </div>

                            <div className = "mb-3" id = "course">
                            <label className = "form-label"> Select Course </label>
                            <select className = "form-select" ref = {courseAppliedRef} required defaultValue = {profileObjects && profileObjects.course} >
                            {courses.map(id => {
                                return <option value = {id} key = {id}>{coursesObjects[id].title}</option>
                            })}
                                
                            </select>
                        </div>

                            <div className = "mb-3" id = "phone">
                                <label className = "form-label"> Phone </label>
                                <input className="form-control"  type = "text" ref = {phoneRef} required defaultValue = {profileObjects && profileObjects.phone} />
                            </div>

                            <div className = "mb-3" id = "address">
                                <label className = "form-label"> Address </label>
                                <input className="form-control"  type = "text" ref = {addressRef} required defaultValue = {profileObjects && profileObjects.address}/>
                            </div>

                            <div className = "mb-3" id = "city">
                                <label className = "form-label"> City </label>
                                <input className="form-control"  type = "text" ref = {cityRef} required defaultValue = "City" placeholder = {profileObjects && profileObjects.city} />
                            </div>

                            <div className = "mb-3" id = "pincode">
                                <label className = "form-label"> Pincode </label>
                                <input className="form-control"  type = "text" ref = {pincodeRef} required defaultValue = {profileObjects && profileObjects.pincode} />
                            </div>

                            <div className = "mb-3" id = "state">
                                <label className = "form-label"> State </label>
                                <input className="form-control"  type = "text" ref = {stateRef} required defaultValue = {profileObjects && profileObjects.state}/>
                            </div>

                            <div className = "mb-3" id = "country">
                                <label className = "form-label"> Country </label>
                                <input className="form-control"  type = "text" ref = {countryRef} required defaultValue = {profileObjects && profileObjects.country}/>
                            </div>

                            <button disabled= {loading} type = "submit" className = "btn btn-danger">{!profileObjects ?<> Create Profile </>: <>Update Profile</>}</button>

                        </form>
                    </div>
                </div> </MakeVisible>
        </>      
    )
}

export default UpdateProfile;

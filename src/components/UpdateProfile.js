import React, { useRef, useState, useEffect } from 'react';
import { database } from '../firebase/firebase';
import { useAuth } from '../context/AuthContext';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Progress from '../helper_component/Progress';
import Expire from '../helper_component/Expire';
import MakeVisible from '../helper_component/MakeVisible';

const UpdateProfile = () => {
    const [profileObjects, setProfileObjects] = useState('');
    console.log(profileObjects.address);
    const usersRef = database.ref(`users`);
    
    const { currentUser } = useAuth();
    const profileURL = usersRef.child(currentUser.uid).child(`profile`);
    
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
            });
            history.push("/");
        } catch {
            setError("Couldn't create User Profile")
        }
        setLoading(false);
    }
    return (
        <> 
             {!profileObjects ? 
           <> Loading... <Progress completed = {0} bgColor = "#6a1b9a"  /> </> : <Expire delay = "1000">  <Progress completed = {100} bgColor = "#6a1b9a" />  </Expire>      }
           {profileObjects &&
           <MakeVisible delay="1500">
                <div className="card">
                    <div className="card-body">
                    <Link to = "/update-credentials" className = "btn btn-primary w-100 mt-2">Update Credential</Link>
                        <h2 className = "text-center mb-4">Update Profile</h2>
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

                            <button disabled= {loading} type = "submit" className = "btn btn-primary">{!profileObjects ?<> Create Profile </>: <>Update Profile</>}</button>

                        </form>
                    </div>
                </div> </MakeVisible>
                               } 
        </>      
    )
}

export default UpdateProfile;

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { database } from '../firebase/firebase';
import Progress from '../helper_component/Progress';
import Expire from '../helper_component/Expire';
import MakeVisible from '../helper_component/MakeVisible';

const Profile = () => {
    const [profileObjects, setProfileObjects] = useState('');
    
    const usersRef = database.ref(`users`);
    
    const { currentUser } = useAuth();
    const profileURL = usersRef.child(currentUser.uid).child(`profile`);
    useEffect(()=>{
        profileURL.on('value', snapshot => {
            if(snapshot.val() != null) {
                setProfileObjects({
                    ...snapshot.val()
                })
                
            }
        })
    },[])
    return (
        <div className = "container mt-3">
        {!profileObjects ? 
           <> Loading... <Progress completed = {0} bgColor = "#6a1b9a"  /> </> : <Expire delay = "1000">  <Progress completed = {100} bgColor = "#6a1b9a" />  </Expire>      }
            {profileObjects &&
            <MakeVisible delay="1000">
            <div className="card">
                <img src="..." className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">About</h5>
                    <form>
                            <div className = "mb-3" id = "first_name">
                                <label className = "form-label">First Name </label>
                                <input className="form-control"  type = "text"   value = {profileObjects && profileObjects.first_name} disabled />
                            </div>

                            <div className = "mb-3" id = "last_name">
                                <label className = "form-label">Last Name </label>
                                <input className="form-control" type = "text" disabled value  = {profileObjects && profileObjects.last_name}  />
                            </div>

                            <div className = "mb-3" id = "profile-photo">
                                <label className = "form-label">Profile Photo</label>
                                <input className="form-control"  type = "text" disabled value = {profileObjects && profileObjects.photoURL}/>
                            </div>

                            <div className = "mb-3" id = "gender">
                                <label className = "form-label"> Gender </label>
                                <select className = "form-select" disabled value = {profileObjects && profileObjects.gender}>
                                    <option value = "Male">Male</option>
                                    <option value = "Female">Female</option>
                                </select>
                            </div>

                            <div className = "mb-3" id = "phone">
                                <label className = "form-label"> Phone </label>
                                <input className="form-control"  type = "text" disabled value = {profileObjects && profileObjects.phone} />
                            </div>

                            <div className = "mb-3" id = "address">
                                <label className = "form-label"> Address </label>
                                <input className="form-control"  type = "text" disabled value = {profileObjects && profileObjects.address}/>
                            </div>

                            <div className = "mb-3" id = "city">
                                <label className = "form-label"> City </label>
                                <input className="form-control"  type = "text" disabled value  = {profileObjects && profileObjects.city} />
                            </div>

                            <div className = "mb-3" id = "pincode">
                                <label className = "form-label"> Pincode </label>
                                <input className="form-control"  type = "text" disabled value = {profileObjects && profileObjects.pincode} />
                            </div>

                            <div className = "mb-3" id = "state">
                                <label className = "form-label"> State </label>
                                <input className="form-control"  type = "text" disabled value = {profileObjects && profileObjects.state}/>
                            </div>

                            <div className = "mb-3" id = "country">
                                <label className = "form-label"> Country </label>
                                <input className="form-control"  type = "text" disabled value = {profileObjects && profileObjects.country}/>
                            </div>

                            

                        </form>
                    
                </div>
            </div> </MakeVisible>
            }
        </div>
    )
}

export default Profile

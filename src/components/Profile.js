import React from 'react';

import Progress from '../helper_component/Progress';
import Expire from '../helper_component/Expire';
import MakeVisible from '../helper_component/MakeVisible';

const Profile = (props) => {
    //const [profileObjects, setProfileObjects] = useState('');
    const profileObjects = props.profileObjects;
    //const usersRef = database.ref(`users`);
    const coursesObjects = props.coursesObjects;
    
    //const { currentUser } = useAuth();
    //const profileURL = usersRef.child(currentUser.uid).child(`profile`);
    // useEffect(()=>{
    //     profileURL.on('value', snapshot => {
    //         if(snapshot.val() != null) {
    //             setProfileObjects({
    //                 ...snapshot.val()
    //             })
                
    //         }
    //     })
    // },[])
    let courseTitle = ''
    if(coursesObjects && profileObjects) {
        courseTitle = coursesObjects[profileObjects.course].title
    }
    
    
    return (
        <div className = "container mt-3">
        {!profileObjects ? 
           <> Loading... <Progress completed = {0} bgColor = "#6a1b9a"  /> </> : <Expire delay = "1000">  <Progress completed = {100} bgColor = "#6a1b9a" />  </Expire>      }
            {profileObjects &&
            <MakeVisible delay="1000">
            <div className="card">
                <img src={profileObjects.photoURL} className="mx-auto d-block card-img-top" alt="..."  style = {{width: "30%"}} />
                <div className="card-body">
                    <h4 className="card-title" style = {{fontSize: "1.4rem"}}>About</h4>
                    <form>
                            <div className = "mb-3" id = "first_name">
                                <label className = "form-label">First Name </label>
                                <input className="form-control"  type = "text"   value = {profileObjects && profileObjects.first_name} disabled />
                            </div>

                            <div className = "mb-3" id = "last_name">
                                <label className = "form-label">Last Name </label>
                                <input className="form-control" type = "text" disabled value  = {profileObjects && profileObjects.last_name}  />
                            </div>

                            <div className = "mb-3" id = "course">
                                <label className = "form-label">Course Enrolled</label>
                                <input className="form-control"  type = "text" disabled value = {profileObjects && courseTitle} />
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

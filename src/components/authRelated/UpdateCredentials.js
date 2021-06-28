import React, { useRef, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link, useHistory } from 'react-router-dom';

const UpdateCredentials = () => {
    const history = useHistory();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { currentUser, updateEmail, updatePassword } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit =  (event) => {
        event.preventDefault();
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match')
        }

        const promises = []
        setLoading(true)
        setError("")
        if(emailRef.current.value !== currentUser.email) {
            promises.push(updateEmail(emailRef.current.value))
        }

        if (passwordRef.current.value) {
            promises.push(updatePassword(passwordRef.current.value))
        }

        Promise.all(promises).then(() => {
            history.push("/");
        }).catch(() => {
            setError("Failed to update account");
        }).finally(() => {
            setLoading(false);
        });
        
    }
    return (
        <>

<div className = "card">
    <div className = "card-body">
        <h2 className = "text-center mb-4">Update Profile</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit = {handleSubmit}>

            <div className = "mb-3" id = "email">
                <label className = "form-label"> Email </label>
                <input disabled className="form-control"  type = "email" ref = {emailRef} defaultValue = {currentUser.email} required />
            </div>

            <div className = "mb-3" id = "password">
                <label className = "form-label"> Password </label>
                <input className="form-control"  type = "password" ref = {passwordRef} placeholder = "Leave blank to keep the same" />
            </div>

            <div className = "mb-3" id = "password-confirm">
                <label className = "form-label"> Password Confirmation </label>
                <input className="form-control"  type = "password" ref = {passwordConfirmRef} placeholder = "Leave blank to keep the same" />
            </div>

            <button disabled = {loading} className = "btn btn-primary mt-3 w-100" type = "submit">Update</button>
        </form>
    </div>
</div>

        <div className = "w-100 text-center mt-2">
             <Link to = "/">Cancel</Link>
        </div>
        </>
    )
}

export default UpdateCredentials;

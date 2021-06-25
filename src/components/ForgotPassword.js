import React, { useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
    
    const emailRef = useRef();
    const [message, setMessage] = useState('');
    const { resetPassword } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            setMessage('');
            setError("");
            setLoading(true);
            await resetPassword(emailRef.current.value);
            setMessage("Check your inbox for further instructions");
            
        } catch   {
            setError("Failed to reset password")
            
        }
        setLoading(false);
       
    }
   
    return (
        <>
        <div className = "card">
    <div className = "card-body">
        <h2 className = "text-center mb-4">Password Reset</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        {message && <div className="alert alert-success">{message}</div>}
        <form onSubmit = {handleSubmit}>
            <div className = "mb-3" id = "email">
                <label className = "form-label"> Email </label>
                <input className="form-control"  type = "email" ref = {emailRef} required />
                <button disabled={loading} className = "btn btn-primary mt-3 w-100" type = "submit">Reset Password</button>
            </div>
        </form>
    </div>
</div>
        <div className = "w-100 text-center mt-2">
            Got your password? <Link to = "/login">Log In</Link>
        </div>

        <div className = "w-100 text-center mt-2">
            Need an account? <Link to = "/signup">Sign Up</Link>
        </div>
        
        </>
    )
}

export default ForgotPassword;

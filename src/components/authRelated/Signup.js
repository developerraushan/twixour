import React, { useRef, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link, useHistory } from 'react-router-dom';


const Signup = () => {
    
    const history = useHistory();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { signup } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match')
        }
        try {
            setError('');
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value);
            
            history.push("/update-profile");
        } catch {
            setError('Failed to create an account')
        }
        setLoading(false)
    }
    return (
        <>

<div className = "card">
    <div className = "card-body">
        <h2 className = "text-center mb-4">Sign Up</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit = {handleSubmit}>

            <div className = "mb-3" id = "email">
                <label className = "form-label"> Email </label>
                <input className="form-control"  type = "email" ref = {emailRef} required />
            </div>

            <div className = "mb-3" id = "password">
                <label className = "form-label"> Password </label>
                <input className="form-control"  type = "password" ref = {passwordRef} required />
            </div>

            <div className = "mb-3" id = "password-confirm">
                <label className = "form-label"> Password Confirmation </label>
                <input className="form-control"  type = "password" ref = {passwordConfirmRef} required />
            </div>

           

            <button disabled = {loading} className = "btn btn-primary mt-3 w-100" type = "submit">Sign Up</button>
        </form>
    </div>
</div>

                   
                   
           

                
           
         


        {/* <Card>
            <Card.Body>
                <h2 className = "text-center mb-4">Sign Up</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit = {handleSubmit}>
                    <Form.Group id = "email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type = "email" ref = {emailRef} required />
                    </Form.Group>
                    <Form.Group id = "password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type = "password" ref = {passwordRef} required />
                    </Form.Group>
                    <Form.Group id = "password-confirm">
                        <Form.Label>Password Confirmation </Form.Label>
                        <Form.Control type = "password" ref = {passwordConfirmRef} required />
                    </Form.Group>
                    <Button disabled = {loading} className = "mt-3 w-100" type = "submit">Sign Up</Button>
                </Form>
            </Card.Body>
        </Card> */}
        <div className = "w-100 text-center mt-2">
            Already have an account? <Link to = "/login">Log In</Link>
        </div>
        </>
    )
}

export default Signup;

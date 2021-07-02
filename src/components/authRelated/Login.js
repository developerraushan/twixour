import React, { useRef, useState } from 'react';

import { useAuth } from '../../context/AuthContext';
import { Link, useHistory } from 'react-router-dom';


const Login = () => {
    let logo = require('../../assets/Images/8.png').default;
    const history = useHistory();
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            setError("");
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            history.push("/");
        } catch   {
            setError("Failed to log in")
            
        }
        setLoading(false);
    }
   
    return (
        <div className = "container mx-auto d-block" style = {{marginTop: "80px"}}>
            <img src = {logo} alt = "loginimg" className = "mx-auto d-block" width = "100%" height = "100%" />
            <div style = {{marginTop: "30px"}}></div>
            <div className = "card mt-5" style = {{border: "2px solid #e82856",fontSize: "32px", marginTop: "20px"}}>
                <div className = "card-body">
        
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

           

                        <button disabled = {loading} className = "btn btn-danger mt-3 w-100" type = "submit">Log In</button>
                    </form>

                    <div className = "w-100 text-center mt-3" style = {{fontSize: "24px"}}>
                        <Link to = "/forgot-password"  style = {{textDecoration : "none"}}>Forgot Password</Link>
                    </div>

                </div>
            </div>




                
           
         


        {/* <Card>
            <Card.Body>
                <h2 className = "text-center mb-4">Log In</h2>
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
                    <Button disabled = {loading} className = "mt-3 w-100" type = "submit">Log In</Button>
                </Form>
                <div className = "w-100 text-center mt-3">
                    <Link to = "/forgot-password">Forgot Password</Link>
                </div>
            </Card.Body>
        </Card> */}
        <div className = "w-100 text-center mt-2" style = {{fontSize: "24px"}}>
            Need an account? <Link to = "/signup" style = {{textDecoration: 'none'}}>Sign Up</Link>
        </div>
        </div>
    )
}

export default Login;

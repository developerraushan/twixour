import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
    const history = useHistory();
    const { currentUser, logout } = useAuth();
    const [error, setError] = useState("");
    const handleLogout = async (event) => {
        event.preventDefault();
        setError("");
        try {
            await logout();
            history.push("/login");
        } catch {
            setError('Failed to log out');
        }
    }
    
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-danger" role = "navigation">
        {error && <div className="alert alert-danger">{error}</div>}
            <div className="container-fluid">
                <Link to ="/" style={{ textDecoration: 'none' }}>
                    <span className="navbar-brand"><b>Twixour</b></span>
                </Link>
                
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                    {currentUser && 
                        <>
                        <li className="nav-item">
                            <Link to = "/" style={{ textDecoration: 'none' }}>
                                <span className="nav-link" href="#" style = {{fontSize: "1.2rem"}}> <b>Home</b> </span>
                            </Link>
                        </li>

                        <li className = "nav-item"> 
                            <Link to = "/profile" style={{ textDecoration: 'none' }}>
                                <span className = "nav-link" style = {{fontSize: "1.2rem"}}><b>Profile</b></span>
                            </Link>
                                
                        </li>
                        

                        <li className="nav-item">
                            <Link to = "/my-projects" style={{ textDecoration: 'none' }}>
                                <span className="nav-link" href="#" style = {{fontSize: "1.2rem"}}> <b>My Projects</b> </span>
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to = "/fee" style={{ textDecoration: 'none' }}>
                                <span className="nav-link" href="#" style = {{fontSize: "1.2rem"}}> <b>Fee</b> </span>
                            </Link>
                        </li>

                        
                        
                        {currentUser.email === "admindev@gmail.com" &&
                            <li className="nav-item">
                                <Link to = "/all-payment" style={{ textDecoration: 'none' }}>
                                <span className="nav-link" href="#" style = {{fontSize: "1.2rem"}}> <b>Payment</b> </span>
                                </Link>
                            </li>
                        }
                        
                        {currentUser.uid === "ou5ysvaWpJfEbVZJbjOrnb2g6qv2" &&
                            <li className="nav-item">
                                <Link to = "/update-profile" style={{ textDecoration: 'none' }}>
                                    <span className="nav-link" href="#" style = {{fontSize: "1.2rem"}}><b>Update Profile</b></span>
                                </Link>
                            </li>
                        }

                        {currentUser.uid === "ou5ysvaWpJfEbVZJbjOrnb2g6qv2" &&
                            <li className = "nav-item">
                                <Link to = "/courses" style = {{ textDecoration: 'none'}}>
                                    <span className = "nav-link" style = {{fontSize: "1.2rem"}}><b>Courses</b></span>
                                </Link>
                            </li>
                        }

                        {currentUser.uid === "ou5ysvaWpJfEbVZJbjOrnb2g6qv2" &&
                            <li className = "nav-item">
                                <Link to = "/projects" style = {{ textDecoration: 'none'}}>
                                    <span className = "nav-link" style = {{fontSize: "1.2rem"}}><b>Projects</b></span>
                                </Link>
                            </li>
                        }
                        
                        
                        

                        <li className="nav-item">
                            <span className="nav-link" onClick = {handleLogout} style = {{fontSize: "1.2rem"}}><b>Log Out</b></span>
                        </li>

                        </>
                    }
                    </ul>
                </div>
            </div>
           
            
        </nav>
    )
}

export default Header

import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
    const history = useHistory;
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
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        {error && <div className="alert alert-danger">{error}</div>}
            <div className="container-fluid">
                <Link to ="/" style={{ textDecoration: 'none' }}>
                    <span className="navbar-brand">Twixour</span>
                </Link>
                
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                    {currentUser && 
                        <>
                        <li className="nav-item">
                            <span className="nav-link" onClick = {handleLogout}>Log Out</span>
                        </li>
                        <li className="nav-item">
                            <Link to = "/update-profile" style={{ textDecoration: 'none' }}>
                                <span className="nav-link" href="#">Update Profile</span>
                            </Link>
                        </li>
                        <li className = "nav-item"> 
                            <Link to = "/profile" style={{ textDecoration: 'none' }}>
                                <span className = "nav-link">Profile</span>
                            </Link>
                                
                            </li>
                        <li className = "nav-item">
                            <Link to = "/courses" style = {{ textDecoration: 'none'}}>
                                <span className = "nav-link">Courses</span>
                            </Link>
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

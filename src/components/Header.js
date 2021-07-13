import React, { useState, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
    const toggle = useRef(null);
    const nav = useRef(null);
    const headerpd = useRef(null);
    const navList = useRef(null);

    const m_header_toggle_handle = (event) => {
        event.preventDefault();
        nav.current.classList.toggle('show')
        // change icon
        toggle.current.classList.toggle('bx-x')
        // add padding to body
        //bodypd.current.classList.toggle('body-pd')
        // add padding to header
        headerpd.current.classList.toggle('body-pd')
            
    }

    const handle_nav_link = (event) => {
        //event.preventDefault();
        const navListItems = navList.current.childNodes;
        
        const navListItemsValues = Object.values(navListItems);
        
        //navListItemsValues.map(element => {element.classList.remove('active')})
        //navListItemsValues.forEach(l=> l.className -= 'active')
      
        //navListItemsValues[0].className += " active";
        
        navListItemsValues.forEach(l => {
            //console.log("I am",l)
            const mClas = l.className;
            
            if(mClas.search('active') !== -1) {
                const startI = mClas.search('active');
                const slicedClass = mClas.slice(0, startI);
                l.className = slicedClass;
                //console.log("active found", l)
            }
        })

        event.currentTarget.className += " active";
    }

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
        <>
        <header className = "header" id = "header" ref = {headerpd}>
                <div className = "header_toggle">
                    <i className = "bx bx-menu" ref = {toggle} id = "header-toggle" onClick = {m_header_toggle_handle}></i>
                </div>
                <div className = "header_img">
                    {/* <img src="https://i.imgur.com/hczKIze.jgp" alt="" /> */}
                </div>
            </header>
        <div className = "l-navbar" id = "nav-bar" ref = {nav}>
        <nav className="nav" >
        {error && <div className="alert alert-danger">{error}</div>}
            <div className="nav_list" ref = {navList}>
                
                
                    
                    {currentUser && 
                        <>

                        <Link to = "/" className = "nav_link" onClick = {handle_nav_link} style={{ textDecoration: 'none' }}>
                        <i className = "fas fa-home nav_logo-icon"></i>
                        <span className = "nav_logo-name">Home</span>
                        </Link>
                        
                        <Link to="/my-projects" className="nav_link" onClick = {handle_nav_link} style={{ textDecoration: 'none' }}> 
                        <i className='fas fa-briefcase nav_icon'></i> 
                        <span className="nav_name">My Projects</span> 
                        </Link>   
                        
                        <Link to="/profile" className="nav_link" onClick = {handle_nav_link} style={{ textDecoration: 'none' }}> 
                        <i className='fas fa-user-tie nav_icon'></i> 
                        <span className="nav_name">Profile</span> 
                    </Link>
                    
                    <Link to="/fee" className="nav_link" onClick = {handle_nav_link} style={{ textDecoration: 'none' }}> 
                        <i className='fas fa-rupee-sign nav_icon'></i> 
                        <span className="nav_name">Fee</span> 
                    </Link>  

                       

                        
                        
                        {currentUser.email === "admindev@gmail.com" &&

                        <Link to="/all-payment" className="nav_link" onClick = {handle_nav_link} style={{ textDecoration: 'none' }}> 
                        <i className='bx bx-bookmark nav_icon'></i> 
                        <span className="nav_name">Payment</span> 
                        </Link>
                            
                        }

                        {currentUser.email === "admindev@gmail.com" &&

                        <Link to="/students" className="nav_link" onClick = {handle_nav_link} style={{ textDecoration: 'none' }}> 
                        <i className='fas fa-users nav_icon'></i> 
                        <span className="nav_name">Students</span> 
                        </Link>

                           
                        }
                        
                        {currentUser.uid === "ou5ysvaWpJfEbVZJbjOrnb2g6qv2" &&

                        <Link to="/update-profile" className="nav_link" onClick = {handle_nav_link} style={{ textDecoration: 'none' }}> 
                        <i className='fas fa-users-cog nav_icon'></i> 
                        <span className="nav_name">Update Profile</span> 
                        </Link>

                            
                        }

                        {currentUser.uid === "ou5ysvaWpJfEbVZJbjOrnb2g6qv2" &&

                        <Link to="/courses" className="nav_link" onClick = {handle_nav_link} style = {{ textDecoration: 'none'}}> 
                        <i className='fas fa-book-open nav_icon'></i> 
                        <span className="nav_name">Courses</span> 
                        </Link>

                        }

                        {currentUser.uid === "ou5ysvaWpJfEbVZJbjOrnb2g6qv2" &&


                        <Link to="/projects" className="nav_link" onClick = {handle_nav_link} style = {{ textDecoration: 'none'}} > 
                        <i className='fas fa-book-open nav_icon'></i> 
                        <span className="nav_name">Projects</span> 
                        </Link>


                            
                        }
                        
                        
                        

                        

                        </>
                    }
                    
            </div>
           
            <Link to = "/logout" className="nav_link" onClick = {handleLogout}> 
                        <i className='bx bx-log-out nav_icon'></i> 
                        <span className="nav_name">Log Out</span> 
            </Link>
        </nav>
        </div>
        </>
    )
}

export default Header

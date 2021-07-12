import React, { useRef } from 'react'
import { Link } from 'react-router-dom';

const NewHeader = () => {
    const toggle = useRef(null);
    const nav = useRef(null);
    //const bodypd = useRef(null);
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
    
    return (
        <div>
            <header className = "header" id = "header" ref = {headerpd}>
                <div className = "header_toggle">
                    <i className = "bx bx-menu" ref = {toggle} id = "header-toggle" onClick = {m_header_toggle_handle}></i>
                </div>
                <div className = "header_img">
                    {/* <img src="https://i.imgur.com/hczKIze.jgp" alt="" /> */}
                </div>
            </header>
            <div className = "l-navbar" id="nav-bar" ref = {nav}>
            <nav className="nav">
            <div> 
                {/* <a href="/" className="nav_logo" onClick = {handle_nav_brand} > 
                    <i className='fas fa-home nav_logo-icon'></i> 
                    <span className="nav_logo-name">Home</span> 
                </a> */}
                <div className="nav_list" ref = {navList}> 
                    <Link to = "/" className = "nav_link" onClick = {handle_nav_link} >
                        <i className = "fas fa-home nav_logo-icon"></i>
                        <span className = "nav_logo-name">Home</span>
                    </Link>
                    
                    <Link to="/my-projects" className="nav_link" onClick = {handle_nav_link}> 
                        <i className='fas fa-briefcase nav_icon'></i> 
                        <span className="nav_name">My Projects</span> 
                    </Link> 
                    <Link to="/fee" className="nav_link" onClick = {handle_nav_link}> 
                        <i className='fas fa-rupee-sign nav_icon'></i> 
                        <span className="nav_name">Fee</span> 
                    </Link> 
                    <Link to="/profile" className="nav_link" onClick = {handle_nav_link}> 
                        <i className='fas fa-user-tie nav_icon'></i> 
                        <span className="nav_name">Profile</span> 
                    </Link> 
                     <Link to="/students" className="nav_link" onClick = {handle_nav_link}> 
                        <i className='fas fa-users nav_icon'></i> 
                        <span className="nav_name">Students</span> 
                    </Link> 
                    <Link to="/payment" className="nav_link" onClick = {handle_nav_link}> 
                        <i className='bx bx-bookmark nav_icon'></i> 
                        <span className="nav_name">Payment</span> 
                    </Link> 
                    <Link to="/update-profile" className="nav_link" onClick = {handle_nav_link}> 
                        <i className='fas fa-users-cog nav_icon'></i> 
                        <span className="nav_name">Update Profile</span> 
                    </Link> 
                    <Link to="/courses" className="nav_link" onClick = {handle_nav_link}> 
                        <i className='fas fa-book-open nav_icon'></i> 
                        <span className="nav_name">Courses</span> 
                    </Link> 
                </div>
            </div> 
            <a href="/sign-out" className="nav_link" onClick = {handle_nav_link}> 
                <i className='bx bx-log-out nav_icon'></i> 
                <span className="nav_name">SignOut</span> 
            </a>
        </nav>
            </div>
        </div>
    )
}

export default NewHeader

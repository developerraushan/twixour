import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from '../context/AuthContext';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { database } from '../firebase/firebase';


import PrivateRoute from './PrivateRoute';
import ForgotPassword from './authRelated/ForgotPassword';
import UpdateCredentials from './authRelated/UpdateCredentials';
import UpdateProfile from './authRelated/UpdateProfile';

import Signup from './authRelated/Signup';
import Dashboard from './Dashboard';
import Login from './authRelated/Login';
import Profile from './Profile';
import Courses from './courses/Courses';
import AddCourse from './courses/AddCourse';
import DetailCourse from './courses/DetailCourse';
import AddStudents from './courses/AddStudents';
import CreateProfile from './authRelated/CreateProfile';
import MyRouter from './MyRouter';
import Projects from './projects/Projects';
import AddProject from './projects/AddProject';
import AddStudentForProject from './projects/AddStudentForProject';
import DetailProject from './projects/DetailProject';
import LoginChecker from './LoginCheker';
import MyProjects from './projects/IndividualProject/MyProjects';
import IndiProjectDetail from './projects/IndividualProject/IndiProjectDetail';

const App = () => {
  // current user
  const { currentUser } = useAuth();
  // address for firebase storage
  const usersRef = database.ref(`users`);
  
  const coursesURL = database.ref('courses');
  const projectsURL = database.ref('projects');
  // state for objects
  const [usersObjects, setUsersObjects] = useState('');
  
  const [coursesObjects, setCoursesObjects] = useState('');
  const [projectObjects, setProjectsObjects] = useState('');
  //const { currentUser } = useAuth();



// all users list
useEffect(()=>{
usersRef.on('value', snapshot => {
    if(snapshot.val() != null) {
        setUsersObjects({
            ...snapshot.val()
        })
    } 
})
},[])

// all courses list
useEffect(()=>{
coursesURL.on('value', snapshot => {
    if(snapshot.val() != null) {
        setCoursesObjects({
            ...snapshot.val()
        })
    } 
})
},[])
// projects object
useEffect(()=>{
projectsURL.on('value', snapshot => {
    if(snapshot.val() != null) {
        setProjectsObjects({
            ...snapshot.val()
        })
    } 
})
},[])
    
  return (
    <AuthProvider>
    <Router>
     
      <Switch>
          <LoginChecker exact path= "/" projectObjects = {projectObjects} coursesObjects = {coursesObjects} component = {Dashboard} />

          <LoginChecker exact path= "/my-projects" projectObjects = {projectObjects} coursesObjects = {coursesObjects} component = {MyProjects} />

          <LoginChecker  path= "/update-credentials" component = {UpdateCredentials} />
          <MyRouter path = "/signup" component = {Signup} />
          <MyRouter path = "/login" component = {Login} />
          <MyRouter path = "/forgot-password" component = {ForgotPassword} />
          <LoginChecker path = "/create-profile" coursesObjects = {coursesObjects} hello = {"hello"} component = {CreateProfile} />
          <LoginChecker path = "/update-profile" coursesObjects = {coursesObjects} component = {UpdateProfile} />
          <LoginChecker path = "/profile" component = {Profile} />
          <LoginChecker exact path = "/courses" component = {Courses} />
          <LoginChecker path = "/add-course" component = {AddCourse} />
          <LoginChecker path = "/courses/:pathPram1" component = {DetailCourse} />
          <LoginChecker path = "/course/add-students" component = {AddStudents} />
          <LoginChecker exact path = "/projects" coursesObjects = {coursesObjects} component = {Projects} />
          <LoginChecker path='/projects/add-project' coursesObjects = {coursesObjects} component = {AddProject} />
          <LoginChecker path = "/projects/:pathPram1" component = {DetailProject} />
          <LoginChecker path = "/project/add-students" component = {AddStudentForProject} />

          <LoginChecker path = "/:pathPram1/:pathPram2/:pathPram3" projectObjects = {projectObjects} coursesObjects = {coursesObjects} component = {IndiProjectDetail} />
      </Switch>
    </Router>
    </AuthProvider>
  );
}

export default App;

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

const App = () => {
  // current user
  const { currentUser } = useAuth();
  // address for firebase storage
  const usersRef = database.ref(`users`);
  const profileURL = usersRef.child(currentUser.uid).child(`profile`);
  const coursesURL = database.ref('courses');
  const projectsURL = database.ref('projects');
  // state for objects
  const [usersObjects, setUsersObjects] = useState('');
  const [profileObjects, setProfileObjects] = useState('');
  const [coursesObjects, setCoursesObjects] = useState('');
  const [projectObjects, setProjectsObjects] = useState('');
  

  
   // current user profile update
  useEffect(()=>{
    profileURL.on('value', snapshot => {
        if(snapshot.val() != null) {
            setProfileObjects({
                ...snapshot.val()
            })
        } 
    })
},[])
 
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
// console.log("from app.js profile of current user", profileObjects)
// console.log("from app.js users list", usersObjects)
// console.log("from app.js courses list", coursesObjects)
  return (
    <AuthProvider>
    <Router>
     
      <Switch>
          <PrivateRoute exact path= "/" component = {Dashboard} />
          <PrivateRoute  path= "/update-credentials" component = {UpdateCredentials} />
          <MyRouter path = "/signup" component = {Signup} />
          <MyRouter path = "/login" component = {Login} />
          <MyRouter path = "/forgot-password" component = {ForgotPassword} />
          <PrivateRoute path = "/create-profile" component = {CreateProfile} />
          <PrivateRoute path = "/update-profile" component = {UpdateProfile} />
          <PrivateRoute path = "/profile" component = {Profile} />
          <PrivateRoute exact path = "/courses" component = {Courses} />
          <PrivateRoute path = "/add-course" component = {AddCourse} />
          <PrivateRoute path = "/courses/:pathPram1" component = {DetailCourse} />
          <PrivateRoute path = "/course/add-students" component = {AddStudents} />
          <PrivateRoute exact path = "/projects" component = {Projects} />
          <PrivateRoute path='/projects/add-project' component = {AddProject} />
      </Switch>
    </Router>
    </AuthProvider>
  );
}

export default App;

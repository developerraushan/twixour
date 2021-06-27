import React from 'react';
import { AuthProvider } from '../context/AuthContext';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';


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

const App = () => {
  
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
          <PrivateRoute path = "/courses" component = {Courses} />
          <PrivateRoute path = "/add-course" component = {AddCourse} />
          <PrivateRoute path = "/course-detail" component = {DetailCourse} />
          <PrivateRoute path = "/course/add-students" component = {AddStudents} />
      </Switch>
    </Router>
    </AuthProvider>
  );
}

export default App;

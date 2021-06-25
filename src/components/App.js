import React from 'react';
import { AuthProvider } from '../context/AuthContext';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';


import PrivateRoute from './PrivateRoute';
import ForgotPassword from './ForgotPassword';
import UpdateCredentials from './UpdateCredentials';
import UpdateProfile from './UpdateProfile';
import Header from './Header';
import Signup from './Signup';
import Dashboard from './Dashboard';
import Login from './Login';

const App = () => {
  return (
    <AuthProvider>
    <Router>
      <Header />
      <Switch>
          <PrivateRoute exact path= "/" component = {Dashboard} />
          <PrivateRoute  path= "/update-credentials" component = {UpdateCredentials} />
          <Route path = "/signup" component = {Signup} />
          <Route path = "/login" component = {Login} />
          <Route path = "/forgot-password" component = {ForgotPassword} />
          <PrivateRoute path = "/update-profile" component = {UpdateProfile} />
      </Switch>
    </Router>
    </AuthProvider>
  );
}

export default App;

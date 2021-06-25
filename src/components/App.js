import React from 'react';
import Signup from './Signup';
import Dashboard from './Dashboard';
import { Container } from 'react-bootstrap';
import { AuthProvider } from '../context/AuthContext';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from './Login';
import PrivateRoute from './PrivateRoute';
import ForgotPassword from './ForgotPassword';
import UpdateCredentials from './UpdateCredentials';
import CreateProfile from './CreateProfile';
import Header from './Header';

const App = () => {
  return (
    <AuthProvider>
    <Header />
       <Container className = "d-flex align-items-center justify-content-center" style = {{ minHeight: "100vh"}}>
    <div className = "w-100" style = {{maxWidth: '400px'}}>
    <Router>
      <AuthProvider>
        <Switch>
          <PrivateRoute exact path= "/" component = {Dashboard} />
          <PrivateRoute  path= "/update-profile" component = {UpdateCredentials} />
          <Route path = "/signup" component = {Signup} />
          <Route path = "/login" component = {Login} />
          <Route path = "/forgot-password" component = {ForgotPassword} />
          <PrivateRoute path = "/create-profile" component = {CreateProfile} />
        </Switch>
      </AuthProvider>
    </Router>
      
      </div>
    </Container>
    </AuthProvider>
  );
}

export default App;

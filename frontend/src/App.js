import React, {Fragment, useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'; 

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Alert from './components/layout/Alert';

import Login from './components/auth/Login';
import Register from './components/auth/Register';

import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/dashboard/events/CreateProfile';
import EditProfile from './components/dashboard/events/EditProfile';
import AddExperience from './components/dashboard/events/AddExperience';


import PrivateRoute from './components/routing/PrivateRoute';

import Post from './components/posts/post/Post';
import Posts from './components/posts/Posts';

// Redux imports
import {Provider} from 'react-redux';
import store from './store';

import setJWT from './utils/setJWT';

import {authenticateUser} from './actions/auth';

import './App.css';
import AddEducation from './components/dashboard/events/AddEducation';

if (localStorage.token)
        setJWT(localStorage.token);

const App = () => {
  useEffect(() => {
    store.dispatch(authenticateUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
            <Navbar/>
            <Route exact path="/" component={Landing} />
            <section className="container">
              <Alert />
              <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />

                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <PrivateRoute exact path="/create-profile" component={CreateProfile} />
                <PrivateRoute exact path="/edit-profile" component={EditProfile} />
                <PrivateRoute exact path="/add-experience" component={AddExperience} />
                <PrivateRoute exact path="/add-education" component={AddEducation} />


                <Route exact path="/posts/:id" component={Post} />
                <Route exact path="/posts" component={Posts} />
              </Switch>
            </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;

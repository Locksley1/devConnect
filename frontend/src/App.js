import React, {Fragment, useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'; 

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Alert from './components/layout/Alert';

import Login from './components/auth/Login';
import Register from './components/auth/Register';

// Redux imports
import {Provider} from 'react-redux';
import store from './store';

import setJWT from './utils/setJWT';

import {authenticateUser} from './actions/auth';

import './App.css';

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
              </Switch>
            </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;

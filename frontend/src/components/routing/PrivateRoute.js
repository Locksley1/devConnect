import React from 'react';
import PropTypes from 'prop-types';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

const PrivateRoute = ({component: Component, auth, ...rest}) => (
    <Route {...rest} render={props => !auth.authenticated && !auth.loading ? (<Redirect to="/login" />) : (<Component {...props} />)} />
);

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute)

import React, {Fragment} from 'react'
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logoutUser} from '../../actions/auth';

const Navbar = (props) => {
    const loggedInLinks = (
        <ul>
            <li><Link to="/dashboard"><i className="fas fa-user"></i>{' '}<span className="hide-sm">Dashboard</span></Link></li>
            <li><a onClick={props.logoutUser} href="#!"><i className="fas fa-sign-out-alt"></i>{' '}<span className="hide-sm">Logout</span></a></li>
        </ul>
    );

    const loggedOutLinks = (
        <ul>
            <li><Link to="!#">Developers</Link></li>
            <li><Link to="register">Register</Link></li>
            <li><Link to="login">Login</Link></li>
        </ul>
    );


    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to="/"><i className="fas fa-code"></i> devConnect</Link>
            </h1>
            {!props.auth.loading && (<Fragment>{props.auth.authenticated ? loggedInLinks : loggedOutLinks}</Fragment>)}
        </nav>
    )
}

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Navbar);

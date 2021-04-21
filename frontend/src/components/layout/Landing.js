import React from 'react'
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

const Landing = (props) => {
    if (props.authenticated)
        return <Redirect to="/dashboard" />

    return (
        <section className="landing">
            <div className="dark-overlay">
                <div className="landing-inner">
                    <h1 className="x-large">devConnect</h1>
                    <p className="lead">
                        Create a developer profile/portfolio, share posts and get help from
                        other developers
                    </p>
                    <div className="buttons">
                        <Link to="register" className="btn btn-primary">Register</Link>
                        <Link to="login" className="btn btn-light">Login</Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

Landing.propTypes = {
    authenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
    authenticated: state.auth.authenticated
});

export default connect(mapStateToProps)(Landing);

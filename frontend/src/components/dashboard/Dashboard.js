import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Spinner from '../layout/spinner/Spinner';

import DashboardEvents from './events/DashboardEvents';
import Education from './Education';
import Experience from './Experience';


import { deleteAccount } from '../../actions/profile';

import { getProfile } from '../../actions/profile';

const Dashboard = ({
  getProfile,
  auth: { logged_user },
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getProfile();
  }, [getProfile]);
  
  return loading  && profile === null ? <Spinner /> :
    <Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome {logged_user && logged_user.name}
      </p>
      {profile !== null ? (
        <Fragment>
          <DashboardEvents />
          <Education education={profile.education} />
          <Experience experience={profile.experience} />

          <div className="my-2">
            <button className="btn btn-danger">
              <i className="fas fa-user-minus" /> Delete My Account
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Create Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
};

Dashboard.propTypes = {
  getProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getProfile, deleteAccount })(
  Dashboard
);
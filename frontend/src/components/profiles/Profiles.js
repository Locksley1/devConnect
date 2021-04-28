import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';

import {getAllProfiles} from '../../actions/profile';
import Spinner from '../layout/spinner/Spinner';

import ProfileItem from './ProfileItem';

const Profiles = props => {
    useEffect(() => {
        props.getAllProfiles();

    }, [props.getAllProfiles])

    return (
        <Fragment>
            {props.profile.loading ? <Spinner/> : <Fragment>
                    <h1 className="large text-primary">Developers</h1>
                    <p className="lead"><i className="fab fa-connectdevelop">{' '} Connect with other like-minded individuals</i></p>
                
                    <div className="profiles">
                        {props.profile.profiles.length > 0 ? (
                            props.profile.profiles.map(profile => (
                                <ProfileItem key={profile._id} profile={profile} />
                            ))
                        ) : <h3>No profiles found</h3>}
                    </div>
                </Fragment>}
        </Fragment>
    )
}

Profiles.propTypes = {
    getAllProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps, {getAllProfiles})(Profiles)

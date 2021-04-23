import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Spinner from '../layout/spinner/Spinner';

import PostItem from './PostItem';

import {getAllPosts} from '../../actions/post';

const Posts = props => {

    useEffect(() => {
        props.getAllPosts();
    }, [props.getAllPosts]);

    return props.post.loading ? <Spinner /> : (
        <Fragment>
            <h1 className="large text-primary">Posts</h1>
            <p className="lead"><i className="fas fa-user"></i> Welcome to devConnect!</p>

            <div className="posts">
                {props.post.posts.map(post => (<PostItem key={post._id} post={post}/>))}
            </div>
        </Fragment>
    );
}

Posts.propTypes = {
    getAllPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    post: state.post
});

export default connect(mapStateToProps, {getAllPosts})(Posts)

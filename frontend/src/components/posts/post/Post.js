import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import Spinner from '../../layout/spinner/Spinner';

import PostItem from '../PostItem';
import AddComment from './AddComment';
import CommentItem from './CommentItem';

import {getPost} from '../../../actions/post';
import { Link } from 'react-router-dom';

const Post = props => {

    useEffect(() => {
        props.getPost(props.match.params.id);
    }, [props.getPost]);

    return props.post.loading || props.post.post === null ? <Spinner/> : 
        <Fragment> 
            <Link to="/posts" className="btn">Go Back</Link>
            <PostItem post={props.post.post} showActions={false} />
            <AddComment postID={props.post.post._id} />

            <div className="comments">
                {[props.post.post.comments.map(comment => (
                    <CommentItem postID={props.post.post._id} key={comment._id} comment={comment}/>
                ))]}
            </div>

        </Fragment>
} 

Post.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    post: state.post
});

export default connect(mapStateToProps, {getPost})(Post);

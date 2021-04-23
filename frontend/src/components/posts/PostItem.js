import React from 'react'
import {Fragment} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Moment from 'react-moment';

import {likePost} from '../../actions/post';
import {unlikePost} from '../../actions/post';
import {deletePost} from '../../actions/post';



const PostItem = props => (
        <div className="post bg-white p-1 my-1">
          <div>
            <a href="profile.html">
              <img
                className="round-img"
                src={props.post.avatar}
                alt=""
              />
              <h4>{props.post.name}</h4>
            </a>
          </div>
          <div>
                <p className="my-1">
                {props.post.text}
                </p>
                <p className="post-date">
                    Posted on <Moment format="YYYY/MM/DD">{props.post.date}</Moment>
                </p>
                <button onClick={event => props.likePost(props.post._id)} type="button" className="btn btn-light">
                  <i className="fas fa-thumbs-up"></i>
                  <span> {props.post.likes.length}</span>
                </button>
                <button onClick={event => props.unlikePost(props.post._id)} type="button" className="btn btn-light">
                  <i className="fas fa-thumbs-down"></i>
                </button>
                <Link to={`/post/${props.post._id}`} className="btn btn-primary">
                Discussion <span className='comment-count'>{props.post.comments.length}</span>
                </Link>
                {!props.auth.loading && props.auth.logged_user !== null && props.post.user === props.auth.logged_user._id && (
                    <button onClick={event => props.deletePost(props.post._id)} type="button" className="btn btn-danger"><i className="fas fa-times"></i></button>
                )}
                
          </div>
        </div>
);

PostItem.propTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    likePost: PropTypes.func.isRequired,
    unlikePost: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
});

export default connect(mapStateToProps, {likePost, unlikePost, deletePost})(PostItem)

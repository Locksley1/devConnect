import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';

import {addComment} from '../../../actions/post';

const AddComment = props => {

    const [text, setText] = useState('');
    return (
        <div className="post-form">
        <div className="bg-primary p">
          <h3>Leave a comment</h3>
        </div>
        <form className="form my-1" onSubmit={event => {
            event.preventDefault();

            props.addComment(props.postID, {text});

            setText('');
        }}>
          <textarea
            name="text"
            cols="30"
            rows="5"
            value={text}
            onChange={event => setText(event.target.value)}
            placeholder="Make a new post"
            required
          ></textarea>
          <input type="submit" className="btn btn-dark my-1" value="Submit" />
        </form>
      </div>
    )
}

AddComment.propTypes = {
    addComment: PropTypes.func.isRequired,
}

export default connect(null, {addComment})(AddComment)

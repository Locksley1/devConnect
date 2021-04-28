import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {addPost} from '../../actions/post';

const AddPost = props => {

    const [text, setText] = useState('');

    return (
        <div className="post-form">
        <div className="bg-primary p">
          <h3>Say Something...</h3>
        </div>
        <form className="form my-1" onSubmit={event => {
            event.preventDefault();

            props.addPost({text});

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

AddPost.propTypes = {
    addPost: PropTypes.func.isRequired,

}

export default connect(null, {addPost})(AddPost);

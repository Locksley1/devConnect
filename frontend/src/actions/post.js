import axios from 'axios';

import {setAlert} from './alert';

import {GET_POSTS} from '../actions/types';
import {POST_ERROR} from '../actions/types';

import {UPDATE_POST_LIKES} from '../actions/types';

import {DELETE_POST} from '../actions/types';


export const getAllPosts = () => async dispatch => {
    try
    {
        const response = await axios.get('/posts');

        dispatch({
            type: GET_POSTS,
            payload: response.data
        });
    }
    catch(error)
    {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
          });
    }
};

export const likePost = postID => async dispatch => {
    try
    {
        const response = await axios.put(`/posts/like/${postID}`);

        dispatch({
            type: UPDATE_POST_LIKES,
            payload: {postID, likes: response.data}
        });
    }
    catch(error)
    {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
          });
    }
};

export const unlikePost = postID => async dispatch => {
    try
    {
        const response = await axios.put(`/posts/unlike/${postID}`);

        dispatch({
            type: UPDATE_POST_LIKES,
            payload: {postID, likes: response.data}
        });
    }
    catch(error)
    {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
          });
    }
};

export const deletePost = postID => async dispatch => {
    try 
    {
        const response = await axios.delete(`/posts/${postID}`);

        dispatch({
            type: DELETE_POST,
            payload: postID
        });

        dispatch(setAlert('Post deleted!', 'success'));
    }
    catch(error)
    {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
          });
    }
}
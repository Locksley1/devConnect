import axios from 'axios';

import {setAlert} from './alert';

import {GET_POST} from '../actions/types';
import {GET_POSTS} from '../actions/types';

import {POST_ERROR} from '../actions/types';

import {UPDATE_POST_LIKES} from '../actions/types';

import {ADD_POST} from '../actions/types';
import {DELETE_POST} from '../actions/types';

import {ADD_COMMENT} from '../actions/types';
import {DELETE_COMMENT} from '../actions/types';


export const getPost = id => async dispatch => {
    try
    {
        const response = await axios.get(`/posts/${id}`);

        dispatch({
            type: GET_POST,
            payload: response.data
        });
    }
    catch(error)
    {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.statusText, status: error.status }
          });
    }
};

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
            payload: { msg: error.statusText, status: error.status }
          });
    }
};

export const likePost = id => async dispatch => {
    try
    {
        const response = await axios.put(`/posts/like/${id}`);

        dispatch({
            type: UPDATE_POST_LIKES,
            payload: {id, likes: response.data}
        });
    }
    catch(error)
    {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.statusText, status: error.status }
          });
    }
};

export const unlikePost = id => async dispatch => {
    try
    {
        const response = await axios.put(`/posts/unlike/${id}`);

        dispatch({
            type: UPDATE_POST_LIKES,
            payload: {id, likes: response.data}
        });
    }
    catch(error)
    {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.statusText, status: error.status }
          });
    }
};


export const addPost = data => async dispatch => {
    const request = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    
    try 
    {
        const response = await axios.post(`/posts`, data, request);

        dispatch({
            type: ADD_POST,
            payload: response.data
        });

        dispatch(setAlert('Post added!', 'success'));
    }
    catch(error)
    {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.statusText, status: error.status }
          });
    }
}


export const deletePost = id => async dispatch => {
    try 
    {
        const response = await axios.delete(`/posts/${id}`);

        dispatch({
            type: DELETE_POST,
            payload: id
        });

        dispatch(setAlert('Post deleted!', 'success'));
    }
    catch(error)
    {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.statusText, status: error.status }
          });
    }
};

export const addComment = (postID, data) => async dispatch => {
    const request = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try 
    {

        const response = await axios.post(`/posts/comment/${postID}`, data, request);


        dispatch({
            type: ADD_COMMENT,
            payload: response.data
        });

        dispatch(setAlert('Comment posted!', 'success'));
    }
    catch(error)
    {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.status }
          });
    }
};

export const deleteComment = (postID, commentID) => async dispatch => {
    try 
    {

        const response = await axios.delete(`/posts/comment/${postID}/${commentID}`);


        dispatch({
            type: DELETE_COMMENT,
            payload: commentID
        });

        dispatch(setAlert('Comment deleted!', 'success'));
    }
    catch(error)
    {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.statusText, status: error.status }
          });
    }
};
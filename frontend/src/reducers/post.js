import {GET_POST} from '../actions/types';
import {GET_POSTS} from '../actions/types';

import {POST_ERROR} from '../actions/types';

import {UPDATE_POST_LIKES} from '../actions/types';

import {ADD_POST} from '../actions/types';
import {DELETE_POST} from '../actions/types';

import {ADD_COMMENT} from '../actions/types';
import {DELETE_COMMENT} from '../actions/types';


const initialState = {
    posts: [],
    post: null,
    loading: true,
    error: {}
};

export default function (state = initialState, action)
{
    if(action.type === GET_POST)
    {
        return {
            ...state,
            post: action.payload,
            loading: false
        };
    }
    else if(action.type === GET_POSTS)
    {
        return {
            ...state,
            posts: action.payload,
            loading: false
        };
    }
    else if(action.type === POST_ERROR)
    {
        return {
            ...state,
            error: action.payload,
            loading: false
        }
    }
    else if(action.type === UPDATE_POST_LIKES)
    {
        return {
            ...state,
            posts: state.posts.map(post => post._id === action.payload.id ? {...post, likes: action.payload.likes} : post),
            loading: false
        };
    }
    else if(action.type === ADD_POST)
    {
        return {
            ...state,
            posts: [action.payload, ...state.posts],
            loading: false,
        };
    }
    else if(action.type === DELETE_POST)
    {
        return {
            ...state,
            posts: state.posts.filter(post => post._id !== action.payload),
            loading: false
        }
    }
    else if(action.type === ADD_COMMENT)
    {
        return {
            ...state,
            post: {...state.post, comments: action.payload},
            loading: false
        }
    }
    else if(action.type === DELETE_COMMENT)
    {
        return {
            ...state,
            post: {
                ...state.post,
                comments: state.post.comments.filter(comment => comment._id !== action.payload)
            },
            loading: false
        }
    }
    else 
    {
        return state;
    }
}
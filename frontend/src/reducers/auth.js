import {REGISTER_SUCCESS} from '../actions/types';
import {REGISTER_FAIL} from '../actions/types'; 

import {LOGIN_SUCCESS} from '../actions/types';
import {LOGIN_FAIL} from '../actions/types'; 

import {AUTH_SUCCESS} from '../actions/types';
import {AUTH_FAIL} from '../actions/types';

import {LOGOUT} from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    authenticated: null,
    loading: true,
    logged_user: null
}

export default function auth(state = initialState, action)
{
    if (action.type === REGISTER_SUCCESS || action.type === LOGIN_SUCCESS)
    {
        localStorage.setItem('token', action.data.token);
        return {
            ...state,
            ...action.data,
            authenticated: true,
            loading: false,
        }
    }
    else if(action.type === REGISTER_FAIL || action.type === AUTH_FAIL || action.type === LOGIN_FAIL || action.type === LOGOUT)
    {
        localStorage.removeItem('token');
        return {
            ...state,
            token: null,
            authenticated: false,
            loading: false,
        }
    }
    else if(action.type === AUTH_SUCCESS)
    {
        return {
            ...state,
            authenticated: true,
            loading: false,
            logged_user: action.data
        }
    }
    else 
    {
        return state;
    }
}


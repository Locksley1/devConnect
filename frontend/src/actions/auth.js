import axios from 'axios';

import setJWT from '../utils/setJWT';

import {setAlert} from './alert';

import {REGISTER_SUCCESS} from './types';
import {REGISTER_FAIL} from './types'; 

import {LOGIN_SUCCESS} from './types';
import {LOGIN_FAIL} from './types'; 

import {AUTH_SUCCESS} from './types';
import {AUTH_FAIL} from './types';


export const authenticateUser = () => async dispatch => {
    if (localStorage.token)
        setJWT(localStorage.token);

    try
    {
        const response = await axios.get('/auth');

        dispatch({
            type: AUTH_SUCCESS,
            data: response.data
        });
    }
    catch(error)
    {
        dispatch({
            type: AUTH_FAIL,
        })
    }

};

export const registerUser = ({name, email, password}) => async dispatch => {
    const config = {
        headers: {
            'Content-Type':'application/json',
        }
    }

    const body = JSON.stringify({name, email, password});

    try 
    {
        const response = await axios.post('/users', body, config);

        dispatch({
            type: REGISTER_SUCCESS,
            data: response.data
        });

        dispatch(authenticateUser());

    }
    catch(error)
    {
        const errors = error.response.data.errors;

        if (errors)
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))

        dispatch({
            type: REGISTER_FAIL
        });
    }
};

export const loginUser = ({email, password}) => async dispatch => {
    const config = {
        headers: {
            'Content-Type':'application/json',
        }
    }

    const body = JSON.stringify({email, password});

    try 
    {
        const response = await axios.post('/auth', body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            data: response.data
        });

        dispatch(authenticateUser());
    }
    catch(error)
    {
        const errors = error.response.data.errors;

        if (errors)
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))

        dispatch({
            type: LOGIN_FAIL
        });
    }
};
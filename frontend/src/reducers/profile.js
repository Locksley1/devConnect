import {GET_PROFILE} from '../actions/types';
import {GET_PROFILES} from '../actions/types';
import {UPDATE_PROFILE} from '../actions/types';
import {CLEAR_PROFILE} from '../actions/types';
import {PROFILE_ERROR} from '../actions/types';


const initialState = {
    profile: null,
    profiles: [],
    repos: [],
    loading: true,
    error: {}
};

export default function(state = initialState, action) {
    if(action.type === GET_PROFILE || action.type === UPDATE_PROFILE) 
    {
        return {
            ...state,
            profile: action.payload,
            loading: false,
        }
    }
    else if(action.type === GET_PROFILES)
    {
        return {
          ...state,
          profiles: action.payload,
          loading: false
        };
    }
    else if (action.type === CLEAR_PROFILE)
    {
        return {
            ...state,
            profile: null,
            repos: [],
            loading: false,
        }
    }
    else if(action.type === PROFILE_ERROR)
    {
        return {
            ...state,
            error: action.payload,
            loading: false,
            profile: null,
        }
    }
    else 
    {
        return state;
    }
}
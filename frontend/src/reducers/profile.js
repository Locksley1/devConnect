import { GET_PROFILE, REMOVE_PROFILE, PROFILE_ERROR, UPDATE_PROFILE, GET_PROFILES, CLEAR_PROFILE } from "../actions/types";

const initialState = {
    profile: null,
    profiles: [],
    // repos: [],
    loading: true,
    error: {}
};

export default function(state = initialState, action) {
    if(action.type === GET_PROFILE || action.type === UPDATE_PROFILE)
    {
        return {
            ...state,
            profile: action.data,
            loading: false,
        }
    }
    else if(action.type === GET_PROFILES)
    {
        return {
          ...state,
          profiles: action.data,
          loading: false
        };
    }
    else if (action.type === REMOVE_PROFILE)
    {
        return {
            ...state,
            profile: null,
            repos: [],
            loading: false,
        }
    }
    else if(action.type === CLEAR_PROFILE)
    {
        return {
          ...state,
          profile: null,
          // repos: []
        };
    }
    else if(action.type === PROFILE_ERROR)
    {
        return {
            ...state,
            error: action.data,
            loading: false,
            profile: null,
        }
    }
    else 
    {
        return state;
    }
}
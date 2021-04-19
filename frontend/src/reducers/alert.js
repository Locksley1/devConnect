import {SET_ALERT} from '../actions/types';
import {REMOVE_ALERT} from '../actions/types';

const initialState = [];

export default function alert(state = initialState, action) {
    if(action.type === SET_ALERT)
        return [...state, action.data];
    else if(action.type === REMOVE_ALERT)
        return state.filter(alert => alert.id !== action.data);
    else
        return state;
};

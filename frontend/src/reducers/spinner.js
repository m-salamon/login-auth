import * as types from '../actions/types';

function spinnerReducer(state =  [], action) {
    switch (action.type) {
        case types.SPINNER:
            return action.payload;
        default:
            return state;
    }
}

export default{
    spinnerReducer
}
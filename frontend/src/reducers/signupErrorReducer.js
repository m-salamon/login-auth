import * as types from '../actions/types';

export default function signupErrorReducer(state = [], action) {
    switch (action.type) {
        case types.ADD_ERROR_SUCCESS:
            return [...state, action.payload];
        case types.REMOVE_ERROR_SUCCESS:
            return state.filter((e) => e.name !== action.payload.name);
        default:
            return state
    }
}
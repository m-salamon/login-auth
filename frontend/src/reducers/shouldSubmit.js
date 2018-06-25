import * as types from '../actions/types';


export default function submitReducer(state = [], action) {
    switch (action.type) {
        case types.ADD_SHOULD_SUBMIT:
            return [...state, action.payload];
        case types.CHANGE_SHOULD_SUBMIT:
            state.forEach((e) => {
                if (e.name === action.payload.name) {
                    e.shouldSubmit = action.payload.shouldSubmit
                }
            });
            return state;
        case types.CLEAR_SHOULD_SUBMIT:
            return action.payload;
        default:
            return state
    }
}
import * as types from '../actions/types';


export default function checkIFLoggedIn(state = [], action) {
    switch (action.type) {
        case types.CHECK_IF_LOGGEDIN:
            return  action.payload;
       
        default:
            return state
    }
}
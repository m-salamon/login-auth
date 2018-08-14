import * as types from '../actions/types';

export default function checkIFLoggedIn(state = [], action) {
    switch (action.type) {
        case types.AUTH_USER:
            return { authenticated: true }
        case types.UNAUTH_USER:
            return { authenticated: false }
        default:
            return state || {}
    }
}
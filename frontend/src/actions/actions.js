import * as types from './types';
import axios from 'axios';
import setHeader from '../utils/setHeader';

function addErrorsSuccess(errorObj) {
  return dispatch => {
    dispatch({ type: types.ADD_ERROR_SUCCESS, payload: errorObj })
  }
}

function removeErrorSuccess(errorObj) {
  return dispatch => {
    dispatch({ type: types.REMOVE_ERROR_SUCCESS, payload: errorObj })
  }
}

function FormIsSubmited(isSubmitted) {
  return dispatch => {
    dispatch({ type: types.FORM_IS_SUBMITTED, payload: isSubmitted })
  }
}
function addShouldSubmit(shouldSubmitObj) {
  return dispatch => {
    dispatch({ type: types.ADD_SHOULD_SUBMIT, payload: shouldSubmitObj })
  }
}

function changeShouldSubmit(shouldSubmitObj) {
  return dispatch => {
    dispatch({ type: types.CHANGE_SHOULD_SUBMIT, payload: shouldSubmitObj })
  }
}

function clearShouldSubmit() {
  return dispatch => {
    dispatch({ type: types.CLEAR_SHOULD_SUBMIT, payload: [] })
  }
}

function authenticated(data) {
  return async dispatch => {
    try {
      let response = await axios.get(`/api/users/checkLog`, setHeader());
      dispatch({ type: types.AUTH_USER, payload: response.data })
    } catch (e) {
      dispatch({ type: types.UNAUTH_USER, payload: '' })
    }
  }
}

export {
  addErrorsSuccess,
  removeErrorSuccess,
  FormIsSubmited,
  addShouldSubmit,
  changeShouldSubmit,
  clearShouldSubmit,
  authenticated
}
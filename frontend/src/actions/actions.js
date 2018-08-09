import * as types from './types';

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

  export {
    addErrorsSuccess,
    removeErrorSuccess,
    FormIsSubmited,
    addShouldSubmit,
    changeShouldSubmit,
    clearShouldSubmit
  }
import { combineReducers } from 'redux';
import { submitReducer, formISSubmitedReducer, signupErrorReducer } from './formReducer'
import { authenticated, errorsReducer, spinnerReducer } from './utilsReducer'

const rootReducer = combineReducers({
   errorsReducer,
   spinnerReducer,
   authenticated,
   formIsSubmited: formISSubmitedReducer,
   shouldSubmit: submitReducer
});

export default rootReducer
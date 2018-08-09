import { combineReducers } from 'redux';
import errors from './errors';
import formIsSubmited from './formIsSubmitted';
import shouldSubmit from './shouldSubmit'
import spinnerReducer  from './spinner';
import checkIFLoggedIn  from './checkIFLoggedIn';

const rootReducer = combineReducers({
   errors,
    formIsSubmited,
   shouldSubmit,
   spinnerReducer,
   checkIFLoggedIn
});

export default rootReducer;


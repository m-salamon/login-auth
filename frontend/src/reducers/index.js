import { combineReducers } from 'redux';
import errors from './errors';
import formIsSubmited from './formIsSubmitted';
import shouldSubmit from './shouldSubmit'
import spinnerReducer  from './spinner';

const rootReducer = combineReducers({
   errors,
    formIsSubmited,
   shouldSubmit,
   spinnerReducer
});

export default rootReducer;


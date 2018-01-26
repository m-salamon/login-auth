import * as React from 'react';
import validateEmail from '../utils/checkEmail';
import { connect } from 'react-redux';
import * as errorsActions from '../actions/actions'

class Input extends React.Component{
    constructor() {
        super();
        this.state = {
            hasError: false,
            errorMessage: ''
        }
    }

    blurHandler = (e) => {
        this.validateInput();
    }

    changeHandler = (e) => {
        this.props.onChange(e);
        let state = Object.assign(this.state);
        state.hasError = false;
        this.setState(state);
    }
    submit = () => {
        this.validateInput();
        if (!this.state.hasError) {
            this.props.changeShouldSubmit({ name: this.props.name, shouldSubmit: true })
        }
    }
    validateInput = () => {
        let state = Object.assign(this.state);
        state.hasError = false;

        if (this.props.onCustomvalidate) {
            let customBlurValidation = this.props.onCustomvalidate();
            let state = Object.assign(this.state);
            state.hasError = customBlurValidation.hasError;
            state.errorMessage = customBlurValidation.errorMessage;
            this.setState(state);
        }
        let val = this.props.value;
        if (!val && this.props.required) {
            state.hasError = true;
            state.errorMessage = this.props.errorMessage;
        } else {

        }
        if (val && this.props.name === 'email' && !validateEmail(val)) {
            state.hasError = true;
            state.errorMessage = 'Not valid email';
        }
        this.setState(state);

    }
    checkIfSubmitted = () => {
        if (this.props.formIsSubmited) {
            this.props.FormIsSubmited(false);
            this.submit();

        }
    }

    componentDidUpdate() {
        this.checkIfSubmitted()
    }

    componentWillMount() {
        if (this.props.required) {
            this.props.addShouldSubmit({ name: this.props.name, shouldSubmit: false });
        }
    }

    render() {
        let error = <span><br /></span>
        let className = 'form-control';
        if (this.state.hasError) {
            error = <span>{this.state.errorMessage}<br /></span>
            className = 'error form-control';
        }

        let required;
        if (this.props.required) {
            required = <span>*</span>
        }
        let checkbox;
        if (this.props.type === 'checkbox' || this.props.type === 'radio') {
            checkbox = ' ' + this.props.placeholder
        }

        return (
            <div className="form-group">
                {error}
                {required}
                <input className={className}
                    type={this.props.type}
                    name={this.props.name}
                    placeholder={this.props.placeholder}
                    onChange={this.changeHandler}
                    onBlur={this.blurHandler}
                    disabled={this.props.disabled}
                    value={this.props.value} />
                <label>
                    {checkbox}
                </label>
            </div>);

    }
}
function mapStateToProps(state) {
    return {
        errors: state.errors,
        formIsSubmited: state.formIsSubmited
    }
}

function mapDispatchToProps(dispatch) {
    return {
        removeErrorSuccess: (error) => dispatch(errorsActions.removeErrorSuccess(error)),
        FormIsSubmited: (isSubmited) => dispatch(errorsActions.FormIsSubmited(isSubmited)),
        addShouldSubmit: (reduxShouldSubmitObj) => dispatch(errorsActions.addShouldSubmit(reduxShouldSubmitObj)),
        changeShouldSubmit: (reduxShouldSubmitObj) => dispatch(errorsActions.changeShouldSubmit(reduxShouldSubmitObj))
    }
}
export default connect(mapStateToProps, mapDispatchToProps, )(Input);

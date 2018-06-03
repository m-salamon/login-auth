import * as React from 'react';
import Input from './input';
import validateEmail from '../utils/checkEmail';

export default class CreatePasswordInput extends React.Component {

    constructor() {
        super()
        this.state = {
            confirmPw: {
                password: '',
                confirmPassword: '',
            },
            pwNotMatch: false,
            errorMessage: 'password does not match'

        }
    }

    changeHandler = (e) => {
        if (e.target.name === 'password') {
            this.props.onChange(e);
        }
        let state = Object.assign({}, this.state);
        state.confirmPw[e.target.name] = e.target.value;
        this.setState(state);
    }

    customvalidate = () => {
        let hasError = this.state.pwNotMatch;
        let state = Object.assign({}, this.state);
        if (state.confirmPw.password !== state.confirmPw.confirmPassword && state.confirmPw.confirmPassword && state.confirmPw.password) {
            hasError = true;
        }
        this.setState(state);
        return {
            hasError: hasError,
            errorMessage: this.state.errorMessage
        }
    }

    render() {
        return (
            <div>
                <Input value={this.props.value} name="password" placeholder='Password' onChange={this.changeHandler} onCustomvalidate={this.customvalidate} type='password' errorMessage='Password required' required />
                <Input value={this.state.confirmPw.confirmPassword} name="confirmPassword" placeholder=' confirm Password' onCustomvalidate={this.customvalidate} onChange={this.changeHandler} type='password' errorMessage=' confirm Password required' required />
            </div>);
    }

}
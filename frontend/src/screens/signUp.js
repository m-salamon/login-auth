import * as React from 'react';
import axios from 'axios';
import { Link, Redirect, BrowserRouter, Route, RouteComponentProps } from 'react-router-dom';
import Button from '../components/button';
import Form from '../components/form';
import Input from '../components/input';
import CreatePasswordInput from '../components/createPasswordInput';
import clearStorage from '../utils/clearLocalStorage';
import LoginAlert from '../components/LoginAlert';

class SignUp extends React.Component {
    constructor() {
        super();
        this.state = {
            signUp: {
                email: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                password: ''

            },
            error: false,
            message: '',
            success: ''
        }
    }


    changeHandler = (e) => {
        let signUp = Object.assign({}, this.state.signUp);
        signUp[e.target.name] = e.target.value;
        this.setState({ signUp });
    }

    addUser = async (api, path) => {
        clearStorage();
        let addUser = await axios.post(api, this.state.signUp);

        if (addUser.data.success) {
            this.clear()
            this.setState({ success: addUser.data.success, message: addUser.data.message })
        } else {
            this.setState({ success: addUser.data.success, errror: true, message: addUser.data.message })
        }
    }

    submit = async () => {
        this.addUser('/auth/users/addUser', '/signup');
    }

    clear = () => {
        this.setState(prevState => ({
            signUp: {
                ...prevState.signup,
                firstName: '',
                lastName: '',
                phoneNumber: '',
                email: '',
                password: '',
            }
        }));
    }

    render() {
        const inputCreater = (name, placeholder, type, errorMessage, required) => {
            return <Input value={this.state.signUp[name]} name={name} placeholder={placeholder}
                onChange={this.changeHandler} type={type} errorMessage={errorMessage} required={required} />
        }

        const confirmPrompt = <div className="confirmPrompt"><p><strong>Confirm Yor Email Address</strong></p><p>{this.state.message}</p></div>

        return (
            <div>
                {this.state.success && confirmPrompt}

                <Form submit={this.submit}>
                    {!this.state.success && this.state.message && <LoginAlert message={this.state.message} />}
                    {inputCreater('firstName', 'First Name', 'text', 'First Name required', true)}
                    {inputCreater('lastName', 'Last Name', 'text', 'Last Name required', true)}
                    {inputCreater('phoneNumber', 'Phone Number (optional)', 'text', 'Phone number required', false)}
                    {inputCreater('email', 'Email', 'text', 'Email required', true)} {/*change type to text and required true*/}
                    <CreatePasswordInput onChange={this.changeHandler} value={this.state.signUp.password} />
                    <Button buttonName='Sign Up' className='mt-3 btn btn-block float-right btn-success' />
                </Form>
            </div>
        )
    }
}

export default SignUp;

import * as React from 'react';
import axios from 'axios';
import { Link, Redirect, BrowserRouter, Route, RouteComponentProps } from 'react-router-dom';
import Button from './button';
import Form from './form';
import Input from './input';
import CreatePasswordInput from './createPasswordInput';
import clearStorage from '../utils/clearLocalStorage';


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
            localStorage.setItem(addUser.data.userIdType, addUser.data.token);
            this.props.history.push('/');
            this.props.history.push(path);
        }
    }

    submit = async () => {

        this.addUser('/auth/users/addUser', '/signup');
    }

    render() {
        const inputCreater = (name, placeholder, type, errorMessage, required) => {
            return <Input value={this.state.signUp[name]} name={name} placeholder={placeholder} onChange={this.changeHandler} type={type} errorMessage={errorMessage} required={required} />
        }

        return (
            <div>
                <Form submit={this.submit}>
                    {inputCreater('firstName', 'First Name', 'text', 'First Name required', false)}
                    {inputCreater('lastName', 'Last Name', 'text', 'Last Name required', false)}
                    {inputCreater('phoneNumber', 'Phone Number', 'text', 'Phone Number required', false)}
                    <CreatePasswordInput onChange={this.changeHandler} value={this.state.signUp.password} />
                    {inputCreater('email', 'Email', 'text', 'Email required', false)} {/*change type to text and required true*/}
                    <Button buttonName='Sign Up' className='btn btn-success' />
                </Form>
            </div>
        )

    }
}

export default SignUp;

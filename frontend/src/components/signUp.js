import * as React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Button from './button';
import Form from './form';
import Input from './input';
import CreatePasswordInput from './createPasswordInput';
import { BrowserRouter, Route, RouteComponentProps } from 'react-router-dom';
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
        console.log('adduser'+ addUser)
        if (addUser.data.success) {
            localStorage.setItem(addUser.data.userIdType, addUser.data.token);
            this.props.history.push(path);
        }
    }

    submit = async () => {
            this.addUser('/auth/users/addUser', '/');
    }

    render() {
        const inputCreater = (name, placeholder, type, errorMessage) => {
            return <Input value={this.state.signUp[name]} name={name} placeholder={placeholder} onChange={this.changeHandler} type={type} errorMessage={errorMessage} required={false} />
        }
        return (
            <div>
                <Form submit={this.submit}>
                    {inputCreater('firstName', 'First Name', 'text', 'First Name required')}
                    {inputCreater('lastName', 'Last Name', 'text', 'Last Name required')}
                    {inputCreater('phoneNumber', 'Phone Number', 'text', 'Phone Number required')}
                    <CreatePasswordInput onChange={this.changeHandler} value={this.state.signUp.password} />
                    {inputCreater('email', 'Email', 'text', 'Email required')}
                    <Button buttonName='Sign Up' className='btn btn-success' />
                </Form>

            </div>
        )

    }
}

export default SignUp;

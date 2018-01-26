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
            vendorCheckbox: false
        }
    }


    changeHandler = (e) => {
        let signUp = Object.assign({}, this.state.signUp);
        signUp[e.target.name] = e.target.value;
        this.setState({ signUp });
    }
    changeCheckbox = (e) => {
        let vendorCheckbox = Object.assign({}, this.state.vendorCheckbox);
        vendorCheckbox = e.target.checked;
        this.setState({ vendorCheckbox });
    }

    addUser = async (api, path) => {
        clearStorage();
        let addUser = await axios.post(api, this.state.signUp);
        if (addUser.data.success) {
            localStorage.setItem(addUser.data.userIdType, addUser.data.token);
            this.props.history.push(path);
        }
    }

    submit = async () => {
        if (!this.state.vendorCheckbox) {
            this.addUser('/auth/users/addUser', '/');
        } else {
            this.addUser('/auth/vendors/createVendorProfile', '/vendorSignUpServiceSelector');
        }
    }

    render() {
        const inputCreater = (name, placeholder, type, errorMessage) => {
            return <Input value={this.state.signUp[name]} name={name} placeholder={placeholder} onChange={this.changeHandler} type={type} errorMessage={errorMessage} required={true} />
        }
        return (
            <div>
                <Form submit={this.submit}>
                    {inputCreater('firstName', 'First Name', 'text', 'First Name required')}
                    {inputCreater('lastName', 'Last Name', 'text', 'Last Name required')}
                    {inputCreater('phoneNumber', 'Phone Number', 'text', 'Phone Number required')}
                    <CreatePasswordInput onChange={this.changeHandler} value={this.state.signUp.password} />
                    {inputCreater('email', 'Email', 'text', 'Email required')}
                    <Input value={this.state.vendorCheckbox} name='vendorCheckbox' onChange={this.changeCheckbox} type='checkbox' errorMessage='' placeholder='I am a vendor' required={false} />
                    <Button buttonName='Sign Up' className='btn btn-success' />
                </Form>

            </div>
        )

    }
}

export default SignUp;

import * as React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Input from './input';
import Button from './button';
import Form from './form';
import clearStorage from '../utils/clearLocalStorage';


class Login extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            login: {
                email: '',
                password: ''
            }
        }
    }

    changeHandler = (e) => {
        let login = Object.assign({}, this.state.login);
        login[e.target.name] = e.target.value;
        this.setState({ login });
    }

    submit = async () => {
        let login = await axios.post('/auth/login/login', this.state.login);
        if (login.data.success) {
            clearStorage();
            localStorage.setItem('returning', 'true');
            localStorage.setItem(login.data.userIdType, login.data.token);
            if (localStorage.getItem('vendorId')) {
                this.props.history.push('/vendorSignUpServiceSelector');
            } else
                this.props.history.push('/profiles');
        }
    }

    render() {
        return (
            <div>
                <Form submit={this.submit}>
                    <Input value={this.state.login.email} name="email" placeholder='Email' onChange={this.changeHandler} type='text' errorMessage='Email required' required />
                    <Input value={this.state.login.password} name="password" placeholder='password' onChange={this.changeHandler} type='password' errorMessage='Password required' required />
                    <Button buttonName='log in' className='btn btn-success' />
                </Form>
            </div>
        )

    }
}
export default Login
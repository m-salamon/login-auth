import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Input from '../components/input';
import Form from '../components/form';
import Button from '../components/button';
import CreatePasswordInput from '../components/createPasswordInput';
import { ResetPasswordState } from '../components/form';
import LoginAlert from '../components/LoginAlert';


class ResetPassword extends React.Component {
    constructor() {
        super();
        this.state = {
            resetPw: {
                password: '',
                email: ''
            },
            error: false
        }
    }

    submit = async () => {
        let tempToken = this.props.match.params.tempToken;
        let updatedPW = await axios.post(`/auth/login/resetPassword/${tempToken}`, { newPassword: this.state.resetPw.password });
        if (updatedPW.data.success){
            this.props.history.push('/login')
        }else{
            this.setState({ error: true })
        }
    }

    changeHandler = (e) => {
        let state = Object.assign({}, this.state);
        state.resetPw[e.target.name] = e.target.value;
        this.setState(state);
    }

    render() {

        return (
            <div>
                <Form submit={this.submit}>
                    {this.state.error && <LoginAlert message={'Ooops there was an error reseting your password.'} />}
                    <div>Please enter a new password</div>
                    <CreatePasswordInput onChange={this.changeHandler} value={this.state.resetPw.password} />
                    <Button buttonName='Reset Password' className='btn btn-success' />
                </Form>
            </div>
        )

    }
}
export default ResetPassword
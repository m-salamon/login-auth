import  React from 'react';
import Form from './form';
import axios from 'axios';
import Input from './input';
import Button from './button';
import { Link } from 'react-router-dom';
import CreatePasswordInput from './createPasswordInput';
import { ResetPasswordState } from  './form';


class ResetPassword extends React.Component{
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
        let updatedPW = await axios.post(`/auth/login/resetPassword/${tempToken}`,{newPassword: this.state.resetPw.password});
        if(updatedPW.data.success)
            this.props.history.push('/login');
       
        let error = Object.assign({}, this.state.error); 
        error = true   
        this.setState({error})    
    }

    changeHandler = (e) => {
        let state = Object.assign({}, this.state);
        state.resetPw[e.target.name] = e.target.value;
        this.setState( state );
    }

    render() {

        return (
            <div>
            {this.state.error && <div>Ooops sometihng went wrong, the link may have expired or is not valid.</div>}
                <Form submit={this.submit}>
                    <div>Please enter a new password</div>
                    <CreatePasswordInput value={this.state.resetPw.password} onChange={this.changeHandler}  />
                    <Button buttonName='reset password' className='btn btn-success' />
                </Form>
            </div>
        )

    }
}
export default ResetPassword
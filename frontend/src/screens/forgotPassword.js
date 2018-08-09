import * as React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Input from '../components/input';
import Button from '../components/button';
import Form from '../components/form';


class ForgotPassword extends React.Component {
    constructor() {
        super();
        this.state = {
            email: '',
            submited: false,
            error: false
        }
    }

    submit = async () => {
        let forgotPw = await axios.post(`/auth/login/forgotPassword`, { email: this.state.email });
        let state = Object.assign({}, this.state);
        if(forgotPw.data.success){
            state.submited = true;
        }else{
            state.error = true
        }
        this.setState(state);
    }

    changeHandler = (e) => {
        let email = Object.assign({}, this.state.email);
        email = e.target.value;
        this.setState({ email });
    }

    render() {
        let formContent;
            if(!this.state.submited){
                formContent =  <div><div>Please enter your email, We will send you a link to create a new password.</div>
                                <Input value={this.state.email} name='email' placeholder='email' onChange={this.changeHandler} type='text' errorMessage='email is required' required />
                                <Button buttonName='Submit' className='btn btn-success' /></div>
            }else if(this.state.submited){
                formContent = <div><b>Check your email</b><br/> We've sent an email to {this.state.email}<br/> click the link in the email to reset your password. <br/> If you don't see the email check other places it might be, like your junk, spam.</div>
            }

        return (
            <div>
            {!this.state.submited && this.state.error && <div>Ooops there was an error sending an email, please check the email address and try again.</div>}
                <Form submit={this.submit}>
                    {formContent}
                </Form>
            </div>
        )

    }
}
export default ForgotPassword
import * as React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Input from './input';
import Button from './button';
import Form from './form';


class forgotPassword extends React.Component {
    constructor() {
        super();
        this.state = {
            email: '',
            submited: false
        }
    }

    submit = async () => {
        let forgotPw = await axios.post(`/auth/login/forgotPassword`, { email: this.state.email });
        let submited = Object.assign({}, this.state.submited);
        submited = true;
        this.setState({ submited });

    }

    changeHandler = (e) => {
        let email = Object.assign({}, this.state.email);
        email = e.target.value;
        this.setState({ email });
    }

    render() {
        let formContent;
            if(!this.state.submited){
                formContent =   <div><div>Enter your email address & we will send you a link where you can create a new password.</div>
                                <Input value={this.state.email} name='email' placeholder='email' onChange={this.changeHandler} type='text' errorMessage='email is required' required />
                                <Button buttonName='reset password' className='btn btn-success' /></div>
            }else{
                formContent = <div> a reset password link was sent to your email</div>
            }

        return (
            <div>

                <Form submit={this.submit}>
                    {formContent}
                </Form>
            </div>
        )

    }
}
export default forgotPassword
import * as React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import Input from '../components/input';
import Button from '../components/button';
import Form from '../components/form';
import clearStorage from '../utils/clearLocalStorage';


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: {
                email: '',
                password: ''
            },
            error: false,
            message: ''
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
            await localStorage.setItem('returning', 'true');
            await localStorage.setItem(login.data.userIdType, login.data.token);
            //this.clear()
            var a = await this.props.CheckIFLoggedIn({isLoggedin: true})
            console.log('aaa', a)
            this.props.history.push('/profile');
        } else {
            this.setState({ error: true, message: login.data.message })
        }
    }

    clear = () => {
        this.setState(prevState => ({
            login: {
                ...prevState.signup,
                email: '',
                password: '',
            }
        }));
    }

    render() {
        return (
            <div>
                {this.state.message}
                <Form submit={this.submit}>
                    <Input value={this.state.login.email} name="email" placeholder='Email' onChange={this.changeHandler} type='email' errorMessage='Email required' required />
                    <Input value={this.state.login.password} name="password" placeholder='password' onChange={this.changeHandler} type='password' errorMessage='Password required' required />
                    <Button buttonName='log in' className='mt-3 btn btn-block float-right btn-success' />
                </Form>
            </div>
        )

    }
}

function mapStateToProps({ checkIFLoggedIn }) {
    console.log('checkIFLoggedIn', checkIFLoggedIn)
    return { checkIFLoggedIn: checkIFLoggedIn.checkIFLoggedIn }
}

function mapDispatchToProps(dispatch) {
    return {
        CheckIFLoggedIn: (state) => dispatch(actions.checkIFLoggedIn(state))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
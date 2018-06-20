import axios from 'axios';
import clearStorage from './clearLocalStorage';
import setHeader from '../utils/setHeader';
import  React from 'react';
import { Redirect } from 'react-router-dom';

class Check extends React.Component{
    constructor() {
        super();
        this.state = {
            redirect: null
        }
    }
    async componentWillMount() {

 
        try {
            var logedIn = await axios.get('/api/users/checkLog', setHeader());
            console.log(logedIn)
            if (this.props.children) {
                this.state.redirect = this.props.children;
            }
        }
        catch (e) {
            clearStorage();
            if (this.props.children) {
                this.state.redirect = <Redirect to='/' />;
            }
        };
        this.setState(this.state);
    }
    render() {

        console.log(this.props.children)

        return (<div>{this.state.redirect}</div>);
    }
}
export default Check;
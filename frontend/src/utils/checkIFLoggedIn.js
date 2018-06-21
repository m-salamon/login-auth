import axios from 'axios'
import clearStorage from './clearLocalStorage'
import setHeader from '../utils/setHeader'
import  React from 'react'
import { Router, Redirect } from 'react-router-dom'

class Check extends React.Component{
    constructor() {
        super();
        this.state = {
            redirect: null
        }
    }
    async componentWillMount() {
        try {
            await axios.get('/api/users/checkLog', setHeader())
           // if (this.props.children) {
                this.state.redirect = this.props.children
           // }
        }
        catch (e) {
            console.log('props', this.props.children)
            clearStorage();
            //if (this.props.children) {
                this.state.redirect = <Redirect to='/login' />
           // }
        }
        this.setState(this.state);
    }
    render() {
        console.log('state', this.state.redirect)

        return (<div>{this.state.redirect}</div>)
    }
}
export default Check;
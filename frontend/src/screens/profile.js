import React, { Component, Fragment } from 'react';
import axios from '../utils/axios';
import setHeader from '../utils/setHeader';

class Profile extends Component {
    constructor() {
        super();
        this.state = {
            readState: {}
        }
    }

    user = async () => {
        const profile = await axios.get('api/users/getUserProfile');
        console.log('profile', profile)
        const data = profile.data.profile;
        const state = Object.assign({}, this.state);
        state.readState = data;
        this.setState(state);
    }
    async componentWillMount() {
        if (localStorage.getItem('userId')) {
            this.user();
            return;
        }
    }
    render() {

        return (
            <div className="container">
                {this.state.readState.firstName}<br />
                {this.state.readState.lastName}<br />
                {this.state.readState.phoneNumber}<br />
                {this.state.readState.email}<br />
                {this.state.readState.password}<br />
                {this.state.readState.isVerified}<br />
            </div>
        )
    }
}
export default Profile;
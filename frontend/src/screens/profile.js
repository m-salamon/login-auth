import * as React from 'react';
import Button from '../components/button';
import axios from 'axios';
import setHeader from '../utils/setHeader';
import Form from '../components/form';
import validateEmail from '../utils/checkEmail';


class Profile extends React.Component{
    constructor() {
        super();
        this.state = {
            editState: '',
            readState: ''
        }
    }
    submit = async () => {
        let hasError;
        for (var p in this.state.readState) {
            if (!this.state.readState[p] || !validateEmail(this.state.readState.email)) {
                this.state.editState[p] = true;
                hasError = true;
            }
        }
        if (hasError) {
            this.setState(this.state);
            return;
        }
        if (localStorage.getItem('userId')) {
            const update = await axios.post('api/users/updateUserProfile', this.state.readState, setHeader());
            console.log(update);
            if (update) {
                this.props.history.push('/');
                return;
            }

        }
        if (parseInt(this.state.readState.radius)) {
            this.state.readState.radius = parseInt(this.state.readState.radius);
        } else {
            this.state.readState.radius = null;
        }
        const update = await axios.post('api/vendors/updateVendorProfile', this.state.readState, setHeader());
        console.log(update);
        if (update) {
            this.props.history.push('/');
        }

    }
    onClick = (e) => {
        const state = Object.assign({}, this.state);
        if (state.editState[e.target.id]) {
            state.editState[e.target.id] = false;
        } else {
            state.editState[e.target.id] = true;
        }
        this.setState(state);
    }
    onChange = (e) => {
        const state = Object.assign({}, this.state);
        state.editState['edit'] = true;
        state.readState[e.target.name] = e.target.value;
        this.setState(state);
    }
    user = async () => {
        const profile = await axios.get('api/users/getUserProfile', setHeader());
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
        let button;
        if (this.state.editState.edit) {
            button = <Button className="btn btn-success" buttonName="Submit Change" onClick={this.submit} />;
        }
       
        return (
            <div className="container">
            {this.state.readState.lastName}
                <Form submit={() => console.log('form')}>
                    <h5>{button}</h5>
                    <h4>Edit Profile</h4>
                </Form>
            </div>
        )
    }
}
export default Profile;
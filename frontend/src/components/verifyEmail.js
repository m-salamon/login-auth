import React from 'react';
import axios from 'axios';
import { RouteComponentProps } from 'react-router-dom';


class verifyEmail extends React.Component{
    constructor(){
        super();
        this.state = {
            isVerified : false,
            tempToken: ''
        }
    }

    async componentDidMount() {
        this.props.match.params.tempToken
        let tempToken = this.props.match.params.tempToken;
        this.setState({tempToken: tempToken});
        let isVerifiedResult = await axios.get(`/auth/vendors/verifyEmail/${tempToken}`);
        this.setState({isVerified: isVerifiedResult.data});
    }

    render() {
        let verified;
        if(this.state.isVerified){
            verified = <div> verified </div>
        }

        return(
            <div>
                {verified}
            </div>
        )

    }
}

export default verifyEmail;
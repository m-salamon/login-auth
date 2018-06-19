import React from 'react';
import { Link } from 'react-router-dom';

class Main extends React.Component {

    render() {
        return (
            <div>
                <p>In the main page!</p>
                <button className="btn" ><Link to={'/login'}> Login </Link></button>
                <button className="btn" ><Link to={'/signup'}> Signup </Link></button>
                <button className="btn" ><Link to={'/resetPassword'}>Reset Password</Link></button>
                <button className="btn" ><Link to={'/forgotPassword'}>Forgot Password</Link></button>
            </div>
        )
    }
}

export default Main;

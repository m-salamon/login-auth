import * as React from 'react';
import { Link } from 'react-router-dom';

class Main extends React.Component {

    render() {
        return (
            <div>
                <p>In the main page!</p>
                <button className="btn" ><Link to={'/login'}> Login </Link></button>
                <button className="btn" ><Link to={'/signup'}> Sighnup </Link></button>
            </div>
        )
    }
}

export default Main;

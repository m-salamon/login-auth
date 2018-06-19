import * as React from 'react';

export default class Button extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div className="">
                <button
                    className={this.props.className}
                    type='submit'
                    onClick={this.props.onClick}
                >
                    {this.props.buttonName}
                </button>
            </div>
        );
    }

}

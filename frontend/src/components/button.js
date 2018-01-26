import * as React from 'react';

export default function Input(props) {
    return (
        <div className="col-md-6 col-md-offset-3">
            <button
                className={props.className}
                type='submit'
                onClick={props.onClick}
            >
                {props.buttonName}
            </button>
        </div>
    );

}
import React, { Component } from 'react';
import './loginButtons.css';

class LoginButtons extends Component {
    constructor(props) {
        super(props);
        this.state = {
            props: props,
        }
    }

    onLoginClicked = (username, password) => {
        console.log(username);
        console.log(password);
    };

    onSignupClicked = (username, password) => {
        console.log(username);
        console.log(password);
    };

    render() {
        let userName = React.createRef();
        let password = React.createRef();
        return (
            <div className="LoginButtons">
                <form action="" className="login-form">
                    <label>
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            ref={(userName)}>
                        </input>
                    </label>
                    <label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            ref={(password)}>
                        </input>
                    </label>
                </form>
                <button 
                    className="btn btn-warning"
                    type="button"
                    onClick={() => {
                        this.onLoginClicked(userName.current.value, password.current.value);
                    }}>
                    Log In
                </button>
                <button 
                    className="btn btn-info"
                    type="button"
                    onClick={() => {
                        this.onSignupClicked(userName.current.value, password.current.value)
                    }}>
                    Sign Up
                </button>
            </div>
        );
    }
}

export default LoginButtons;
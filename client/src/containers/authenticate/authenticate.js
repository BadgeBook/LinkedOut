import React, { Component } from 'react';
import axios from 'axios';
import './authenticate.css';

class Authenticate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            props: props,
        }
    }

    componentDidMount() {
        this.updateAuthenticationState();
    }

    updateAuthenticationState = () => {
        let userId = sessionStorage.getItem('_id');
        if (userId) {
            this.setState({
                props: this.state.props,
                userId: userId
            })
        } else {
            this.setState({
                props: this.state.props,
                userId: null
            })
        }
    };

    onSignUpClicked = (username, password, name) => {
        this.setState({
            signUpClicked: true
        });
        if (!username || !password) {
            this.setState({
                error: "Missing username or password"
            });
        }
        if (!name) {
            this.setState({
                error: "Enter your username, password, and full name"
            });
        }
        if (username && password && name) {
            axios.post('/api/signUp', {
                username: username,
                password: password,
                fullname: name
            })
                .then(response => {
                    this.createUserSession(response)
                });
        }
    };

    onLoginClicked = (username, password) => {
        if (!username || !password) {
            this.setState({
                error: "Missing username or password"
            })
        } else {
            axios.post('/api/login', {
                username: username,
                password: password
            })
                .then(response => {
                    this.createUserSession(response)
                });
        }
    };

    onSignOutClicked = () => {
        sessionStorage.clear();
        this.updateAuthenticationState();
    };

    createUserSession = (response) => {
        if (!response.data.id) {
            this.setState({
                error: response.data.errorMessage
            });
            return;
        }

        this.setState({
            userId: response.data.id,
        });

        sessionStorage.clear();
        sessionStorage.setItem("_id", response.data.id);
    };

    render() {
        let userName = React.createRef();
        let fullName = React.createRef();
        let password = React.createRef();
        // name.current.value = "";

        let errMessage;
        if (this.state.error) {
            errMessage = <h5 className="errorMessage">{this.state.error}</h5>
        }

        let successMessage;
        if (this.state.userId) {
            successMessage = <h5 className="successMessage">"Logged in!"</h5>;
            errMessage = ""
        }

        let nameInput = <div ref={(fullName)}/>;

        if (this.state.signUpClicked) {
            nameInput =
                <label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        ref={(fullName)}>
                    </input>
                </label>;
        }


        let signInView =
            <div>
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
                    {nameInput}
                </form>
                <button
                    className="btn btn-warning h-spacing"
                    type="button"
                    onClick={() => {
                        this.onLoginClicked(userName.current.value, password.current.value);
                    }}>
                    Log In
                </button>
                <button
                    className="btn btn-info h-spacing"
                    type="button"
                    onClick={() => {
                        this.onSignUpClicked(userName.current.value, password.current.value, fullName.current.value)
                    }}>
                    Sign Up
                </button>
            </div>
        ;

        let signOutView =
            <button
                className="btn btn-danger"
                type="button"
                onClick={() => {
                    this.onSignOutClicked()
                }}>
                Sign Out
            </button>
        ;

        let returnedView = null;

        if (this.state.userId) {
            returnedView = signOutView;
        } else {
            returnedView = signInView;
        }
        
        return (
            <div className="Authenticate">
                {errMessage}
                {successMessage}
                {returnedView}
            </div>
        );
    }
}

export default Authenticate;
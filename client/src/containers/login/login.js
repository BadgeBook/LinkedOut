import React, { Component } from 'react';
import axios from 'axios';
import './login.css';

class Login extends Component {
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

    createUserSession = (response) => {
        if (!response.data.id) {
            this.setState({
                error: response.data.errorMessage
            });
            return;
        }

        sessionStorage.clear();
        sessionStorage.setItem("_id", response.data.id);

        // REDIRECT BACK TO EXTERNAL APP
        // PROMPT TO GIVE PERMISSION TO EXTERNAL APP
        // REGISTER THEM IN DB IF NOT IN DB CONNECTING TABLE
    };

    checkAppPermission = (user, token) => {
        axios.post('/api/getApplicationUser', {
            user: username,
            token: password
        })
            .then(response => {
                console.log(response)
                return response;
            });
    }

    onPermissionClicked = () => {

    }

    render() {
        let userName = React.createRef();
        let password = React.createRef();
        let externalURL = window.location.href.split("#");
        console.log(externalURL[1])
        console.log(externalURL[2])

        let errMessage;
        if (this.state.error) {
            errMessage = <h5 className="errorMessage">{this.state.error}</h5>
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
                </form>
                <button
                    className="btn btn-warning"
                    type="button"
                    onClick={() => {
                        this.onLoginClicked(userName.current.value, password.current.value);
                    }}>
                    Log In
                </button>
            </div>
        ;

        /*let permissionView =
        <div>
            <form action="" className="app-permission">
                <label>
                    <p>
                        Allow {(externalURL[2])} permission to access your LinkedOut profile?
                    </p>
                </label>
            </form>
            <button
                className="btn btn-warning"
                type="button"
                onClick={() => {
                    this.onPermissionClicked(userName.current.value, );
                }}>
                Yes
            </button>
        </div>
        ;*/

        let returnedView = null;

        if (this.state.userId) {
            /*let externalURL = window.location.href.split("#");
            console.log(externalURL[1])
            console.log(externalURL[2])

            if (checkAppPermission(this.state.userId, externalURL[2])) {
                window.location.href = externalURL(1);
            } else {
                returnedView = permissionView;
            } */

            returnedView = signInView; 
            // REDIRECT BACK TO EXTERNAL APP AND PASS USERNAME AND APPTOKEN
            // IF NOT IN DB, PROMPT TO ALLOW APP ACCESS
            // REGISTER IN DB IF NOT IN DB CONNECITON TABLE
        } else {
            returnedView = signInView;
        }
        
        return (
            <div className="Login">
                {errMessage}
                {returnedView}
            </div>
        );
    }
}

export default Login;
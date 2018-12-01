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
        let externalURL = window.location.href.split("#");
        let appInfo = []

        axios.post('/api/getApplicationInfo', {
            token: externalURL[2]
        })
            .then(response => {
                appInfo = response.data[0];
                if (userId) {
                    this.setState({
                        props: this.state.props,
                        userId: userId,
                        appURL: externalURL[1],
                        appName: appInfo.name,
                        appId: appInfo.id,
                        appToken: appInfo.outgoingToken
                    })
                } else {
                    this.setState({
                        props: this.state.props,
                        userId: null,
                        appURL: externalURL[1],
                        appName: appInfo.name,
                        appId: appInfo.id,
                        appToken: appInfo.outgoingToken
                    })
                }
            });
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
        window.location.reload();
    };

    checkAppPermission = (user, application) => {
        axios.post('/api/getApplicationUser', {
            user: user,
            application: application
        })
            .then(response => {
                return response;
            });
    }

    onPermissionClicked = (user, application) => {
        axios.post('/api/givePermission', {
            user: user,
            application: application
        })
            .then(response => {
                this.redirect()
            }); 
    }

    redirect = () => {
        axios.post('/api/redirectExternalApp', {
            userid: this.state.userId,
            apptoken: this.state.appToken,
            URL: this.state.appURL
        })
    }

    render() {
        let userName = React.createRef();
        let password = React.createRef();
        let externalURL = window.location.href.split("#");

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

        let returnedView = null;

        if (this.state.userId) {
            axios.post('/api/getApplicationUser', {
                user: this.state.userId,
                application: this.state.appId
            })
                .then(response => {
                    if (response.data.length > 0) {
                        this.redirect()
                    } else {
                        let loginDiv = document.createElement("DIV")
                        loginDiv.setAttribute("class", "Login")

                        let msg = document.createElement("P")
                        msg.setAttribute("class", "app-permission")
                        msg.innerHTML = "Allow " + this.state.appName + " permission to access your LinkedOut profile?"
                        
                        let button = document.createElement("BUTTON")
                        button.setAttribute("class", "btn btn-warning")
                        button.setAttribute("type", "button")
                        button.onclick = () => {this.onPermissionClicked(this.state.userId, this.state.appId)}
                        button.innerHTML = "Yes"
                        
                        loginDiv.append(msg)
                        loginDiv.append(button)
                        document.getElementById("root").append(loginDiv)
                    }
                });
        } else {
            returnedView = signInView;
        }
        
        if (returnedView != null)
            return (
                <div className="Login">
                    {errMessage}
                    {returnedView}
                </div>
            );
        else
            return (
                <div></div>
            )
        }
}

export default Login;
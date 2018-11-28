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
    };

    render() {
        let userName = React.createRef();
        let password = React.createRef();

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

        if (this.state.userId) {
            returnedView = signInView; //REDIRECT BACK TO EXTERNAL APP AND PASS USERNAME AND APPTOKEN;
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
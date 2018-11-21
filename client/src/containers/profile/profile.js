import React, { Component } from 'react';
import './profile.css';
import SearchBar from '../../containers/searchBar/searchBar';
import UserInfo from '../../components/userInfo/userInfo';
import axios from "axios/index";


class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false
        };
    }

    componentDidMount() {
        let userId = sessionStorage.getItem("_id");
        if (userId) {
            this.getUserFromDb(userId);
        }
    }

    getUserFromDb = (userId) => {
        axios.post('/api/getUser', {
            userId: userId
        })
            .then(response => this.setState({
                isLoggedIn: true,
                user: response.data
            }));
    };

    render() {
        if (this.state.isLoggedIn) {
            return (
                <div className="Profile">
                    <div className="d-flex justify-content-center">
                        <SearchBar history={this.props.history}/>
                    </div>
                    <div className="container">
                        <UserInfo user={this.state.user}/>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="Profile">
                    <div className="not-signed-in-message d-flex justify-content-center"><h1>Sign In To View</h1></div>
                </div>
            )
        }
    }
}

export default Profile;
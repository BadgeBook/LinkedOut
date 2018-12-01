import React, { Component } from 'react';
import './homepage.css';
import axios from 'axios';
import SearchBar from '../../containers/searchBar/searchBar';
import Authenticate from '../authenticate/authenticate';
import AppCardsList from '../../components/appCardsList/appCardsList';


class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            applications: []
        };
    }

    componentDidMount() {
        this.getApplicationList();
    }

    getApplicationList = () => {
        axios.post('/api/getApplications', {
        })
            .then(response => this.setState({
                applications: response.data
            }));
    };

    render() {
        return (
            <div className="Homepage">
                <div className="login d-flex justify-content-center">
                    <Authenticate history={this.props.history}/>
                </div>
                <div className="d-flex justify-content-center">
                    <SearchBar history={this.props.history}/>
                </div>
                <h2>Landing Page</h2>
                <div className="v-spacing">
                    <button
                        className="btn btn-success h-spacing"
                        onClick={() => window.location.href = '/profile'}>
                        Go to profile
                    </button>
                    <button
                        className="btn btn-success h-spacing"
                        onClick={() => window.location.href = '/allConversations'}>
                        View Conversations
                    </button>
                </div>
                <div className="AppCardsList">
                    <AppCardsList applications={this.state.applications}/>
                </div>
            </div>
        );
    }
}

export default Homepage;

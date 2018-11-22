import React, { Component } from 'react';
import './homepage.css';
import axios from 'axios';
import SearchBar from '../../containers/searchBar/searchBar';
import Authenticate from '../authenticate/authenticate';
import AppList from '../../components/appList/appList';


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
                <button className="btn btn-success" onClick={() => window.location.href = '/profile'}>Go to profile</button>
                <div className="AppList">
                    <AppList applications={this.state.applications}/>
                </div>
            </div>
        );
    }
}

export default Homepage;

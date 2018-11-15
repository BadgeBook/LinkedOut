import React, { Component } from 'react';
import './homepage.css';
import SearchBar from '../../containers/searchBar/searchBar';


class Homepage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="Homepage">
                <div className="d-flex justify-content-center">
                    <SearchBar history={this.props.history}/>
                </div>
                <h2>Landing Page</h2>
                <button className="btn btn-success" onClick={() => window.location.href = '/profile'}>Go to profile</button>
            </div>
        );
    }
}

export default Homepage;

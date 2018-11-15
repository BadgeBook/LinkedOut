import React, { Component } from 'react';
import './homepage.css';
import CardsList from '../../components/cardsList/cardsList';


class Homepage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="Homepage">
                <h2>Landing Page</h2>
                <button className="btn btn-success" onClick={() => window.location.href = '/profile'}>Go to profile</button>
            </div>
        );
    }
}

export default Homepage;

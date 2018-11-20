import React, { Component } from 'react';
import axios from 'axios';
import './searchPage.css';
import CardsList from '../../components/cardsList/cardsList';


class SearchPage extends Component {
    constructor(props) {
        super(props);
        if (this.props.location.state) {
            this.state = {
                search: this.props.location.state.search,
            };
        }
    }

    componentDidMount() {
        this.sendSearchToDb();
    }

    sendSearchToDb = () => {
        axios.post('/api/search', {
            search: this.state.search
        })
            .then(response => this.setState({
                users: response.data,
                search: this.state.search
            }));
    };

    render() {
        console.log("print state\n");
        console.log(this.state);

        // Redirect back to profile if search string is empty
        if (!this.props.location.state) {
            this.props.history.push('/profile');
        }

        // Display found users
        return (
            <div className="SearchPage">
                <CardsList users={[this.state.users]}/>
            </div>
        );
    }
}

export default SearchPage;
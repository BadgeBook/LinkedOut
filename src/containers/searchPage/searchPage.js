import React, { Component } from 'react';
import './searchPage.css';
import CardsList from '../../components/cardsList/cardsList';


class SearchPage extends Component {
    constructor(props) {
        super(props);
        if (this.props.location.state) {
            this.state = {
                search: this.props.location.state.search,
                users: [],
            };
        }
    }

    componentDidMount() {
       fetch('http://localhost:4000/users')
            .then(res => {
                console.log(res);
                return res.json()
            })
            .then(users => { 
                console.log(users); 
                this.setState({ users })
            });
    }

    render() {
        // Redirect back to profile if search string is empty
        if (!this.props.location.state) {
            this.props.history.push('/profile');
        }

        // Find users from the search query (quick mockup)
        let displayedUsers = [];
        if (this.props.location.state) {
            this.state.users.forEach(user => {
                if (user.firstname === this.state.search) {
                    displayedUsers.push(user);
                }
                if (user.lastname === this.state.search) {
                    displayedUsers.push(user);
                }
            });
        }

        // Display found users
        return (
            <div className="SearchPage">
                <CardsList users={displayedUsers}/>
            </div>
        );
    }
}

export default SearchPage;
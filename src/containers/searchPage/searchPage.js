import React, { Component } from 'react';
import './searchPage.css';
import CardsList from '../../components/cardsList/cardsList';


class SearchPage extends Component {
    constructor(props) {
        super(props);
        if (this.props.location.state) {
            this.state = {
                search: this.props.location.state.search,
                users: [{ // dummy users while waiting for database implementation
                    firstname: "name1",
                    lastname: "lname",
                    picture: "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png",
                    badges: ["badge1", "badge2", "badge3"],
                    description: "Description of user 1",
                },
                {
                    firstname: "name2",
                    lastname: "lname",
                    picture: "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png",
                    badges: ["badge1", "badge2", "badge3"],
                    description: "Description of user 2",
                },
                {
                    firstname: "name3",
                    lastname: "lname",
                    picture: "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png",
                    badges: ["badge1", "badge2", "badge3"],
                    description: "Description of user 3",
                }],
            };
        }
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
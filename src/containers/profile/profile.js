import React, { Component } from 'react';
import './profile.css';
import SearchBar from '../../containers/searchBar/searchBar';
import UserInfo from '../../components/userInfo/userInfo';


class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                picture: "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
                firstname: "First Name",
                lastname: "Last Name",
                badges: ["badge1", "badge2", "badge3"],
            }
        };
    }

    onSearchClicked = (searchString) => {
        if (searchString) {
            console.log("Search for: " + searchString);
            this.props.history.push({
                pathname: '/search',
                search: '?query=' + searchString,
                state: {search: searchString}, 
              })
        }
    };

    render() {
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
    }
}

export default Profile;
import React, { Component } from 'react';
import './profile.css';
import SearchBar from '../../containers/searchBar/searchBar';
import UserInfo from '../../components/userInfo/userInfo';


class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                firstname: "name1",
                lastname: "lname",
                picture: "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png",
                badges: ["badge1", "badge2", "badge3"],
                description: "Description of user 1",
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
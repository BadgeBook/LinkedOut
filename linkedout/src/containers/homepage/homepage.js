import React, { Component } from 'react';
import 'homepage.css'
import User from '../../model/user.js'

class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
        }
    }

    populateUser = () => {
        for (let i = 0; i < 10; i++) {
            User.first_name = i + " First Name";
            User.last_name = i + " Last Name";
            User.user_description = i + " User description";
            User.user_badges = ["badge1" + i, "badge2" + i, "badge3" + i];
            let temp = this.state.users;
            temp.append(User);
            this.setState({
                users: temp
            });
        }
    };

    render() {
        this.populateUser();
        return (
            <div className="Homepage">
                {this.state.users.map((user) => {
                    return (
                        <div>
                            <p>{user.first_name}</p>
                            <p>{user.last_name}</p>
                            <p>{user.description}</p>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default Homepage;

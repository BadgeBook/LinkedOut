import React, { Component } from 'react';
import './homepage.css';
import CardsList from '../../components/cardsList/cardsList';


class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: this.populateUsers(),
        };
    }

    populateUsers = () => {
        let temp = [];
        for (let i = 0; i < 10; i++) {
            temp.push({
                first_name : i + " First Name",
                last_name : i + " Last Name",
                user_description : i + " User description",
                user_badges : ["badge1" + i, "badge2" + i, "badge3" + i],
            });
        }
        return temp;
    };

    render() {
        return (
            <div className="Homepage">
                <CardsList users={this.state.users} />
            </div>
        );
    }
}

export default Homepage;

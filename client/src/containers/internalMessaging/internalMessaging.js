import React, {Component} from 'react';
import { Redirect } from 'react-router-dom'
import './internalMessaging.css';


class ViewUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fromUser: sessionStorage.getItem("_id"),
            toUser: this.props.location.state.user.username
        }
    }

    componentDidMount() {
        console.log("To User: " + this.state.toUser);
        console.log("From User: " + this.state.fromUser);
    }

    render() {
        return (
            <div className="UserInfo d-flex justify-content-center">
                <h1>Conversation between {this.state.fromUser} and {this.state.toUser}</h1>
            </div>
        );
    }
}

export default ViewUser;
import React, {Component} from 'react';
import './internalMessaging.css';
import axios from "axios/index";
import MessageView from '../../components/messageView/messageView'


class ViewUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fromUser: null,
            toUser: this.props.location.state.user
        }
    }

    componentDidMount() {
        axios.post('/api/getUser', {
            userId: sessionStorage.getItem('_id')
        })
            .then(response => {
                this.setState({
                    fromUser: response.data[0],
                    toUser: this.state.toUser,
                    messages: this.state.messages
                });
                this.fetchMessages();
            });
    };

    fetchMessages = () => {
        axios.post('/api/getMessages', {
            user_id_sender: this.state.fromUser.id,
            user_id_receiver: this.state.toUser.id
        })
            .then(response => {
                this.setState({
                    fromUser: this.state.fromUser,
                    toUser: this.state.toUser,
                    messages: response.data
                })
            });
    };

    render() {
        if (this.state.messages && this.state.fromUser) {
            console.log(this.state);
            return (
                <div className="UserInfo">
                    <div className="d-flex justify-content-center">
                        <h1>Conversation between {this.state.fromUser.fullname} and {this.state.toUser.fullname}</h1>
                    </div>
                    <div className="d-flex justify-content-center">
                        <MessageView
                            messages={this.state.messages}
                            fromUser={this.state.fromUser}
                            toUser={this.state.toUser}
                        />
                    </div>
                </div>
            );
        }

        return (
            <div className="UserInfo d-flex justify-content-center">
                <h1>Fetching ..</h1>
            </div>
        );
    }
}

export default ViewUser;
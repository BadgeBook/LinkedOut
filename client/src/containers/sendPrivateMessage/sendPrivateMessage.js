import React, { Component } from 'react';
import axios from 'axios';
import './sendPrivateMessage.css';

class SendPrivateMessage extends Component {
    constructor(props) {
        super(props);
    }

    onSendPrivateMessageClicked = (message) => {
        if (message) {
            axios.post('/api/sendMessage', {
                user_id_sender: this.props.fromUser.id,
                user_id_receiver: this.props.toUser.id,
                content: message,
                timestamp: new Date().toJSON().replace("T", " ").replace("Z","").slice(0,-4) //YYYY-MM-DD HH:MM:SS
            })
                .then(/**Callback?*/);
        }
    };

    render() {
        let messageBody = React.createRef();
        return (
            <div className="SendPrivateMessage">
                <input
                    type="text"
                    name="messageBody"
                    placeholder="Message ..."
                    ref={(messageBody)}>
                </input>
                <button
                    className="btn btn-info"
                    type="button"
                    onClick={() => {
                        this.onSendPrivateMessageClicked(messageBody.current.value);
                    }}>
                    Send
                </button>
            </div>
        );
    }
}

export default SendPrivateMessage;
import React from 'react';
import './messageView.css';
import SingleMessage from '../singleMessage/singleMessage'

const MessageView = (props) => {
    return (
        <div className="MessageView">
            <ul className="list-group list-group-flush">
                {
                    props.messages.map((message) => {
                        let whichMessage = null;
                        if (message.user_id_sender === props.fromUser.id) {
                            whichMessage = 'sender'
                        } else {
                            whichMessage = 'receiver'
                        }
                        return(
                            <SingleMessage
                                body={message.content}
                                timestamp={message.timestamp}
                                fromUser={props.fromUser}
                                toUser={props.toUser}
                                whichMessage = {whichMessage}
                            />
                        );
                    })
                }
            </ul>
        </div>
    );
};

export default MessageView;
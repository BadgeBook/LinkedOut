import React, {Component} from 'react';
import './conversationCard.css';

class ConversationCard extends Component {
    constructor(props) {
        super(props);
    }

    onViewConversationClicked = () => {
        this.props.history.push({
            pathname: '/messageUser',
            state: {user: this.props.user},
        });
    };

    render() {
        return (
            <div className="ConversationCard col-sm-12 col-md-3">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">{this.props.user.fullname}</h5>
                        <button className="btn btn-primary" onClick={() => this.onViewConversationClicked()}>View Conversation</button>
                    </div>
                </div>
            </div>
        );
    };
}

export default ConversationCard;
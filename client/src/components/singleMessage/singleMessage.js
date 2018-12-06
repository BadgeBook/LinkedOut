import React from 'react';
import './singleMessage.css';

const SingleMessage = (props) => {
    let cardTitle = null;
    let whichMessage = props.whichMessage;
    let cardClassName = "card w-100 " + whichMessage;
    if (whichMessage === 'sender') {
        cardTitle = <h5 className="card-title">{props.fromUser.fullname} wrote:</h5>;
    } else {
        cardTitle = <h5 className="card-title">{props.toUser.fullname} wrote:</h5>
    }
    return (
        <div className="SingleMessage">
            <div className={cardClassName}>
                <div className="card-body">
                    {cardTitle}
                    <p className="card-text">{props.body}</p>
                </div>
            </div>
        </div>
    );
};

export default SingleMessage;
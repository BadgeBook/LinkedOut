import React from 'react';
import './userCard.css';


const UserCard = (props) => {
    return (
        <div className="UserCard col-sm-12 col-md-6">
            <div className="card">
                <div className="card-body" onClick={() => console.log("card clicked")}>
                    <h5 className="card-title">{props.user.first_name}</h5>
                    <p className="card-text">{props.user.user_description}</p>
                    <a href="#" className="btn btn-primary">Go somewhere</a>
                </div>
            </div>
        </div>
    );
};

export default UserCard;
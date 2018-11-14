import React from 'react';
import './userCard.css';


const UserCard = (props) => {
    return (
        <div className="UserCard col-sm-12 col-md-3">
            <div className="card">
                <img class="card-img-top" src={props.user.picture} alt="Card image cap"></img>
                <div className="card-body" onClick={() => console.log("card clicked")}>
                    <h5 className="card-title">{props.user.firstname + " " + props.user.lastname}</h5>
                    <p className="card-text">{props.user.description}</p>
                    <a href="#" className="btn btn-primary">View user</a>
                </div>
            </div>
        </div>
    );
};

export default UserCard;
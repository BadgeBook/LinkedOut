import React from 'react';
import './userInfo.css';
import BadgeList from '../badgeList/badgeList';


const UserInfo = (props) => {
    return (
        <div className="UserInfo">
            <div className="card jumbotron">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-3">
                            <img alt="..." className="img-thumbnail" src={props.user.icon}></img>
                        </div>
                        <div className="col-md-6 profile-info">
                            <row>
                                <h2 className="card-title">{props.user.fullname}</h2>
                                <div className="description">{props.user.description}</div>
                            </row>
                        </div>
                        <div className="col-md-2 profile-info">
                            <BadgeList badges={props.user.badges} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserInfo;
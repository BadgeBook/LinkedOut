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
                            <img alt="..." className="img-thumbnail" src={props.user.picture}></img>
                        </div>
                        <div className="col-md-6 profile-info">
                            <row>
                                <h2 className="card-title">{props.user.firstname} {props.user.lastname}</h2>
                                <div className="description">
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi id lorem 
                                        diam. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vivamus 
                                        hendrerit nisi augue, vitae eleifend nisi feugiat eu. Suspendisse euismod 
                                        auctor justo, quis aliquam est luctus ac. 
                                    </p>
                                </div>
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
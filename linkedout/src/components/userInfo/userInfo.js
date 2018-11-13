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
                                <h2 className="card-title">{props.user.firstname}</h2>
                            </row>
                            <row>
                                <h2 className="card-text">{props.user.lastname}</h2>
                            </row>
                        </div>
                        <div className="col-md-2 profile-info">
                            <row>
                                <BadgeList badges={props.user.badges} />
                            </row>
                        </div>
                    </div>
                    <div className="row description">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi id lorem 
                            diam. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vivamus 
                            hendrerit nisi augue, vitae eleifend nisi feugiat eu. Suspendisse euismod 
                            auctor justo, quis aliquam est luctus ac. Morbi sit amet ligula at erat 
                            pulvinar vestibulum. Quisque eu euismod tortor, quis venenatis leo. Aliquam 
                            fermentum euismod maximus. Nunc mattis sem lorem, eu lacinia metus consectetur 
                            pulvinar. Duis magna libero, congue eu velit interdum, lacinia rhoncus mi. 
                            Maecenas fringilla massa tempus est eleifend varius. Praesent nec ultricies magna, 
                            venenatis dignissim metus. Ut pellentesque venenatis imperdiet. Donec tincidunt 
                            in enim vel cursus. Nulla condimentum purus ac leo dignissim elementum. Cras ut 
                            risus sit amet velit sollicitudin bibendum. Maecenas lorem tellus, ornare vitae 
                            odio sit amet, pharetra condimentum sem.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserInfo;
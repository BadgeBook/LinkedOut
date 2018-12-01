import React from 'react';
import './badgeList.css';

const BadgeList = (props) => {
    let userBadges = sessionStorage.getItem("_badges");
    userBadges = JSON.parse(userBadges);
    let i;
    for (i=0; i<userBadges.length; i++) {
        userBadges[i] = userBadges[i].appname + " " 
            + userBadges[i].badgetype + ": " + userBadges[i].value
    }
    return (
        <div className="BadgeList">
            <ul className="list-group list-group-flush">
               {
                   props.badges.map((badge, index) => {
                    return(
                        <span className="badge badge-pill badge-warning" key={index}>{userBadges[index]}</span>
                    );
                })}
            </ul>
        </div>
    );
};

export default BadgeList;
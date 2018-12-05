import React from 'react';
import './badgeList.css';

const BadgeList = (props) => {
    let userBadges = sessionStorage.getItem("_badges");
    userBadges = JSON.parse(userBadges);
    let i;
    let badges = [];
    let icons = [];
    for (i=0; i<userBadges.length; i++) {
        badges[i] = userBadges[i].badgetype + ": " + userBadges[i].value
        icons[i] = "" + userBadges[i].image + ""
    }
    return (
        <div className="BadgeList">
            <ul className="list-group list-group-flush">
               {
                   props.badges.map((badge, index) => {
                    return(
                    <span className="badge badge-pill badge-warning" key={index}>
                        <img src={icons[index]} width="50" height="50"></img>
                        {userBadges[index].appname}<br></br>
                        {badges[index]}
                    </span>
                    );
                })}
            </ul>
        </div>
    );
};

export default BadgeList;
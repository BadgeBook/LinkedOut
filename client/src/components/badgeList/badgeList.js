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
                    <span className="badge badge-pill badge-success" key={index}>
                        <img src={icons[index]} width="30" height="30"></img>
                        &nbsp;{userBadges[index].appname}<br></br>
                        <span className="badgevalue">{badges[index]}</span>
                    </span>
                    );
                })}
            </ul>
        </div>
    );
};

export default BadgeList;
import React from 'react';
import './badgeList.css';

const BadgeList = (props) => {
    return (
        <div className="BadgeList">
            <ul className="list-group list-group-flush">
               {props.badges.map((badge, index) => {
                    return(
                        <span class="badge badge-pill badge-warning" key={index}>{badge}</span>
                    );
                })}
            </ul>
        </div>
    );
};

export default BadgeList;
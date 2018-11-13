import React from 'react';
import './badgeList.css';

const BadgeList = (props) => {
    return (
        <div className="BadgeList">
            <ul className="list-group list-group-flush">
               {props.badges.map((badge) => {
                    return(
                        <span class="badge badge-pill badge-warning">{badge}</span>
                    );
                })}
            </ul>
        </div>
    );
};

export default BadgeList;
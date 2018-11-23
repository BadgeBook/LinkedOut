import React from 'react';
import './appList.css';


const AppList = (props) => {
    return (
        <div className="AppCard col-sm-12 col-md-3">
            <div className="card">
                <img className="card-img-top" src={props.application.icon} alt="Card image cap"></img>
                <div className="card-body" onClick={() => console.log("card clicked")}>
                    <h5 className="card-title">{props.application.name}</h5>
                    <a href={props.application.URL} className="btn btn-primary">Go to app</a>
                </div>
            </div>
        </div>
    );
};

export default AppList;
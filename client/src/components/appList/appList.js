import React from 'react';

const AppList = (props) => {
    return (
        <div className="AppList">
            <div className="container">
                <div className="row">
                    {props.applications.map((application, index) => {
                        return (
                            <div className="card" key={index}>
                                <img className="card-img-top" src={props.applications.icon} alt="Card image cap"></img>
                                <div className="card-body" onClick={() => console.log("card clicked")}>
                                    <h5 className="card-title">{props.applications.name}</h5>
                                    <a href={props.applications.URL} className="btn btn-primary">Go to app</a>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

export default AppList;
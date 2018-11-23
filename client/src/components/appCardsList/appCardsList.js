import React from 'react';
import AppList from '../../components/appList/appList';


const AppCardsList = (props) => {
    return (
        <div className="AppCardsList">
            <div className="container">
                <div className="row">
                    {props.applications.map((application, index) => {
                        return (
                            <AppList application={application} key={index} />
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

export default AppCardsList;
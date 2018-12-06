import React from 'react';
import UserCard from '../../components/userCard/userCard';


const CardsList = (props) => {
    return (
        <div className="CardsList">
            <div className="container">
                <div className="row">
                    {props.users.map((user, index) => {
                        return (
                            <UserCard history={props.history} user={user} key={index} />
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

export default CardsList;
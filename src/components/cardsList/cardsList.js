import React from 'react';
import UserCard from '../../components/userCard/userCard';


const CardsList = (props) => {
    return (
        <div className="CardsList">
            <div className="container">
                <div className="row">
                    {props.users.map((user) => {
                        return (
                            <UserCard user = {user} />
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

export default CardsList;
import React, {Component} from 'react';
import './userCard.css';

class UserCard extends Component {
    constructor(props) {
        super(props);
    }

    onViewUserClicked = () => {
        this.props.history.push({
            pathname: '/viewUser',
            state: {user: this.props.user},
        });
    };

    onMessageUserClicked = () => {
        this.props.history.push({
            pathname: '/messageUser',
            state: {user: this.props.user},
        });
    };

    render() {
        return (
            <div className="UserCard col-sm-12 col-md-3">
                <div className="card">
                    <img className="card-img-top" src={this.props.user.picture} alt="Card image cap"/>
                    <div className="card-body">
                        <h5 className="card-title">{this.props.user.fullname}</h5>
                        <p className="card-text" dangerouslySetInnerHTML={{__html: this.props.user.description}}/>
                        <button className="btn btn-primary" onClick={() => this.onViewUserClicked()}>View user</button>
                        {
                            (sessionStorage.getItem('_id')) &&
                            <button className="btn btn-warning" onClick={() => this.onMessageUserClicked()}>
                                Message User
                            </button>
                        }
                    </div>
                </div>
            </div>
        );
    };
}

export default UserCard;
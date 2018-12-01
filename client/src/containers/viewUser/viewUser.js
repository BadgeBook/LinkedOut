import React, {Component} from 'react';
import BadgeList from '../../components/badgeList/badgeList';
import './viewUser.css';


class ViewUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.location.state.user
        }
    }

    render() {
        return (
            <div className="UserInfo d-flex justify-content-center">
                <div className="card jumbotron">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-3">
                                <img alt="..." className="img-thumbnail" src={this.state.user.icon}/>
                            </div>
                            <div className="col-md-6 profile-info">
                                <h2 className="card-title">{this.state.user.fullname}</h2>
                                <div dangerouslySetInnerHTML={{__html: this.state.user.description}}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ViewUser;
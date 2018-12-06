import React, {Component} from 'react';
import BadgeList from '../../components/badgeList/badgeList';
import './viewUser.css';
import axios from "axios/index";


class ViewUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.location.state.user,
            badges: []
        }
    }

    componentDidMount() {
        this.getUserBadgesFromDb(this.state.user.id);
    }

    getUserBadgesFromDb = (userId) => {
        axios.post('/api/getUserBadges', {
            userId: userId
    })
        .then(response => {
            sessionStorage.setItem("_badges", JSON.stringify(response.data));
            this.setState({
                user: this.props.location.state.user,
                badges: response.data  
            })
        });
    };

    render() {
        return (
            <div className="UserInfo d-flex justify-content-center">
            <div className="container">
                <div className="card jumbotron">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-9 profile-info">
                                <h2 className="card-title">{this.state.user.fullname}</h2>
                                <div dangerouslySetInnerHTML={{__html: this.state.user.description}}/>
                            </div>
                            <div className="col-md-3 profile-info">
                                <BadgeList badges={this.state.badges}/>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        );
        
    }
}

export default ViewUser;
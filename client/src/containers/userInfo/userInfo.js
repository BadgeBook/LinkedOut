import React, {Component} from 'react';
import './userInfo.css';
import BadgeList from '../../components/badgeList/badgeList';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from "axios/index";


class UserInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editMode: false,
            text: props.user.description,
            user: props.user
        };
    }

    handleTextChange = (value) => {
        this.setState({
            editMode: true,
            text: value,
            user: this.state.user
        });
    };

    onSaveChangesClick = () => {
        this.setState({
            editMode: false,
            text: this.state.text,
            user: this.state.user
        });
        this.updateUserToDb();
    };

    onChangeDescriptionClick = () => {
        this.setState({
            editMode: true,
            text: this.state.text,
            user: this.state.user
        });
    };

    updateUserToDb = () => {
        let user = this.prepareUpdatedUser();
        axios.post('/api/updateUser', {
            user: user
        })
            .then(response => {
                console.log(response);
            });
    };

    // User json that will be sent to the database for update
    prepareUpdatedUser = () => {
        let fullname = "";
        let icon = "";
        let description = "";
        let badges = "";

        if (this.state.user.fullname !== this.props.user.fullname) {
            fullname = this.state.user.fullname;
        }
        if (this.state.user.icon !== this.props.user.icon) {
            icon = this.state.user.icon;
        }
        if (this.state.text !== this.props.user.description) {
            description = this.state.text;
        }
        if (this.state.user.badges !== this.props.user.badges) {
            badges = this.state.user.badges;
        }

        return {
            userId: sessionStorage.getItem("_id"),
            fullname: fullname,
            icon: icon,
            description: description,
            badges: badges
        };
    };

    render() {
        let descriptionText = null;
        let descriptionButton = null;

        if (this.state.editMode) {
            descriptionText = <ReactQuill value={this.state.text} onChange={this.handleTextChange} />;
            descriptionButton = <button
                className="btn btn-info"
                onClick={this.onSaveChangesClick}>
                Save Changes
            </button>;
        } else {
            descriptionText = <div className="description" dangerouslySetInnerHTML={{__html: this.state.text}} />;
            descriptionButton = <button
                className="btn btn-info"
                onClick={this.onChangeDescriptionClick}>
                Update Description
            </button>;
        }
        if(this.state.user.badges) {
            let i;
            for (i=0; i<this.state.user.badges.length; i++) {
                if (i!==1) {
                    this.state.user.badges[i] = JSON.stringify(this.state.user.badges[i])
                }
            }
            return (
                <div className="UserInfo">
                    <div className="card jumbotron">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-3">
                                    <img alt="..." className="img-thumbnail" src={this.state.user.icon}/>
                                </div>
                                <div className="col-md-6 profile-info">
                                    <row>
                                        <h2 className="card-title">{this.state.user.fullname}</h2>
                                        <div>
                                            {descriptionText}
                                            {descriptionButton}
                                        </div>
                                    </row>
                                </div>
                                <div className="col-md-2 profile-info">
                                    <BadgeList badges={this.state.user.badges}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        else {
            console.log("got here")
            return (
                <div className="UserInfo">
                    <div className="waiting"><h1>Wait...</h1></div>
                </div>
            )
        }
    }
}

export default UserInfo;
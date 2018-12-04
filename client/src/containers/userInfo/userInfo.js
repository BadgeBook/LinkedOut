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

    quillModules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline', 'blockquote'],
            [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
            ['link', 'image'],
            ['clean']
        ],
    };

    quillFormats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
    ];

    componentDidMount() {
        let userId = sessionStorage.getItem("_id");
        if (userId) {
            this.getUserBadgesFromDb(userId);
        }
    }

    handleTextChange = (value) => {
        console.log(value);
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

    getUserBadgesFromDb = (userId) => {
        axios.post('/api/getUserBadges', {
            userId: userId
    })
        .then(response => {
            sessionStorage.setItem("_badges", JSON.stringify(response.data));
            this.setState({
                badges: response.data  
            })
        });
    };

    // User json that will be sent to the database for update
    prepareUpdatedUser = () => {
        let fullname = "";
        let icon = "";
        let description = "";

        if (this.state.user.fullname !== this.props.user.fullname) {
            fullname = this.state.user.fullname;
        }
        if (this.state.user.icon !== this.props.user.icon) {
            icon = this.state.user.icon;
        }
        if (this.state.text !== this.props.user.description) {
            description = this.state.text;
        }

        return {
            userId: sessionStorage.getItem("_id"),
            fullname: fullname,
            icon: icon,
            description: description
        };
    };

    render() {
        let descriptionText = null;
        let descriptionButton = null;

        if (this.state.editMode) {
            descriptionText = <ReactQuill
                value={this.state.text}
                onChange={this.handleTextChange}
                modules={this.quillModules}
                formats={this.quillFormats}
            />;
            descriptionButton = <div><button
                className="btn btn-info"
                onClick={this.onSaveChangesClick}>
                Save Changes
            </button> Maximum image size: 250x250</div>;
        } else {
            descriptionText = <div className="description" dangerouslySetInnerHTML={{__html: this.state.text}} />;
            descriptionButton = <button
                className="btn btn-info"
                onClick={this.onChangeDescriptionClick}>
                Update Description
            </button>;
        }
        if(this.state.badges) {
            let i;
            for (i=0; i<this.state.badges.length; i++) {
                this.state.badges[i] = this.state.badges[i].appname + " " 
                    + this.state.badges[i].badgetype + ": " + this.state.badges[i].value
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
                                    <h2 className="card-title">{this.state.user.fullname}</h2>
                                    <div>
                                        {descriptionText}
                                        {descriptionButton}
                                    </div>
                                </div>
                                <div className="col-md-2 profile-info">
                                    <BadgeList badges={this.state.badges}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        else if (this.state.user) {
            return (
                <div className="UserInfo">
                    <div className="card jumbotron">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-3">
                                    <img alt="..." className="img-thumbnail" src={this.state.user.icon}/>
                                </div>
                                <div className="col-md-6 profile-info">
                                    <h2 className="card-title">{this.state.user.fullname}</h2>
                                    <div>
                                        {descriptionText}
                                        {descriptionButton}
                                    </div>
                                </div>
                                <div className="col-md-2 profile-info">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default UserInfo;
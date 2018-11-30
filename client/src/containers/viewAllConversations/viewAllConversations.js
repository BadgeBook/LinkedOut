import React, { Component } from 'react';
import axios from 'axios';
import './viewAllConversations.css';
import ConversationCard from '../../components/conversationCard/conversationCard';
import SearchBar from '../searchBar/searchBar';


class ViewAllConversations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: sessionStorage.getItem('_id')
        };
    }

    componentDidMount() {
        this.fetchUser();
        this.fetchConversations();
    };

    fetchUser = () => {
        axios.post('/api/getUser', {
            userId: this.state.userId
        })
            .then(response => {
                this.setState({
                    user: response.data[0],
                    recipients: this.state.recipients
                });
            });
    };

    fetchConversations = () => {
        axios.post('/api/getConversations', {
            userId: this.state.userId
        })
            .then(response => {
                this.setState({
                    user: this.state.user,
                    recipients: response.data
                });
            });
    };

    render() {
        if (this.state.recipients) {
            return (
                <div className="ViewAllConversations">
                    <div className="d-flex justify-content-center">
                        <SearchBar history={this.props.history}/>
                    </div>
                    <div className="container">
                        <div className="row">
                            {this.state.recipients.map((user, index) => {
                                return (
                                    <ConversationCard history={this.props.history} user={user} key={index}/>
                                )
                            })}
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="ViewAllConversations">
                    <div className="d-flex justify-content-center">
                        <SearchBar history={this.props.history}/>
                    </div>
                    <h1>No open conversations</h1>
                </div>
            )
        }
    }
}

export default ViewAllConversations;
import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
// moment().format()

class EntryCard extends Component {
    constructor(props) {
        super(props)
    }
    handleDelete = (event) => {
        event.preventDefault();
        var AuthStr = 'JWT '.concat(localStorage.token);
        var userInfo = JSON.parse(localStorage.getItem('id'))
        var userId = userInfo.id
        axios({
            method: 'delete',
            url: `/api/entries/${this.props.entry._id}`,
            headers: { Authorization: AuthStr }
        }).then(serverResponse => {
            window.location.pathname = `/activities/${this.props.activityId}`;
        })
    }

    render() {
        const { entry } = this.props
        console.log(this.props.activityId);
        return (
            <li className="flex items-center lh-copy bg-br">
                <img src="../running-man.png" className="w2 h2 w3-ns h3-ns br-100" />
                <div className="pl3 flex-auto">
                    <span className="f6 db black-70">Date: {moment(entry.date).format("dddd, MMMM Do YYYY")}</span>
                    <span className="f6 db black-70">Quantity: {entry.quantity}</span>
                </div>
                <div>
                    <a onClick={this.handleDelete} className="link blue hover-dark-gray medium">Delete Entry</a>
                </div>
            </li>


        );
    }
}

export default EntryCard;
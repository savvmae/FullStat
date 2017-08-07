import React, { Component } from 'react';
import axios from 'axios';
var moment = require('moment-timezone');
moment().tz("America/Los_Angeles").format();

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
        return (
            <li className="flex items-center lh-copy bg-br">
                <img src="../running-man.png" className="w2 h2 w3-ns h3-ns br-100" />
                <div className="pl3 flex-auto">
                    <span className="db black-70 nike l-space medium rosy">{moment(entry.date).tz("Europe/Berlin").format("dddd, MMMM Do YYYY")}</span>
                    <span className="db black-70 l-space nike medium rosy">{entry.quantity} {localStorage.activityD}</span>
                </div>
                <div>
                    <a onClick={this.handleDelete} className="link ball hover-br medium">Delete Entry</a>
                </div>
            </li>


        );
    }
}

export default EntryCard;
import React, { Component } from 'react';
import axios from 'axios';

import Entries from './Entries'

class ActivityCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activity: this.props.activity.type,
            description: this.props.activity.description
        }

        this.getEntries.bind(this)
    }

    _handleDelete = (event) => {
        event.preventDefault();
        var AuthStr = 'JWT '.concat(localStorage.token);
        var userInfo = JSON.parse(localStorage.getItem('id'))
        var userId = userInfo.id
        axios({
            method: 'delete',
            url: `/api/activities/${this.props.activity._id}`,
            headers: { Authorization: AuthStr }
        }).then(serverResponse => {
            window.location.pathname = '/home'
        })
    }
    handleUpdate = (event) => {
        event.preventDefault();
        var AuthStr = 'JWT '.concat(localStorage.token);
        var userInfo = JSON.parse(localStorage.getItem('id'))
        var userId = userInfo.id
        axios({
            method: 'put',
            url: `/api/activities/${this.props.activity._id}`,
            headers: { Authorization: AuthStr },
            data: {
                type: this.state.activity,
                description: this.state.description
            }
        }).then(serverResponse => {
            console.log(serverResponse)
            this.setState({
                activity: this.state.activity,
                description: this.state.description
            })
        })
    }
    getEntries = (event) => {
        event.preventDefault();
        console.log(this.props)
        localStorage.activity = this.props.activity._id;
        localStorage.activityT = this.props.activity.type;
        localStorage.activityD = this.props.activity.description;
        console.log(localStorage.activity)
        window.location.pathname = `/activities/${this.props.activity._id}`
    }
    handleType = (event) => {
        this.setState({
            activity: event.target.value
        })
    }
    handleDesc = (event) => {
        this.setState({
            description: event.target.value
        })
    }
    clearText = (event) => {
        event.target.value = ''
    }
    putActText = (event) => {
        if (event.target.value === '') {
            event.target.value = this.state.activity
        }
    }
    putDescText = (event) => {
        if (event.target.value === '') {
            event.target.value = this.state.description
        }
    }
    render() {
        return (
            <div className="dt dt--fixed">
                <section className="tc pa3 pa5-ns dtc tc pv4">
                    <article className="hide-child relative ba b--black-20 mw5 center bg-whitee">
                        <img className="padding" src="./running-man.png" />
                        <div className="pa2 b--black-20">
                            <form className="activity-form">
                                <input onChange={this.handleType} onFocus={this.clearText} onBlur={this.putActText} className="activity-input nike medium" value={this.state.activity} />
                                <input onChange={this.handleDesc} onFocus={this.clearText} onBlur={this.putDescText} className="activity-input nike medium" value={this.state.description} />
                                <div className="button-wrap">
                                    <button type="submit" className="link tc ph3 pv1 db bg-animate bg-green hover-bg-blue white br1 fifty nike l-space" onClick={this.handleUpdate}>update</button>
                                    <button className="link tc ph3 pv1 db bg-animate bg-green hover-bg-blue white br1 fifty nike l-space" onClick={this._handleDelete}>delete</button>
                                </div>
                            </form>

                            <div className="flex-center">
                                <button type="submit" className="link tc ph3 pv1 db bg-animate bg-green hover-bg-blue white br1 nike l-space big-b" onClick={this.getEntries}>entries for {this.state.activity}</button>

                            </div>
                        </div>

                    </article>
                </section>
            </div>
        )
    }
}

export default ActivityCard;


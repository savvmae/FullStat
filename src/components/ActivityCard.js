import React, { Component } from 'react';
import axios from 'axios';

import Entries from './Entries'

class ActivityCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            entries: []
        }
        this.getEntries.bind(this)
    }

    _handleDelete = (event) => {
        event.preventDefault();
        let deleteRoute = `/api/activities/${this.props.activity._id}`
        axios.delete(deleteRoute).then(response => {
            window.location.pathname = '/home'
        })
    }
    getEntries = (event) => {
        event.preventDefault();
        localStorage.activity = this.props.activity._id;
        console.log(localStorage.activity)
        window.location.pathname = `/activities/${this.props.activity._id}`
    }


    render() {
        const { activity } = this.props
        return (
            <section className="tc pa3 pa5-ns">
                <article className="hide-child relative ba b--black-20 mw5 center">
                    <img src="./activity.png"/>
                    <div className="pa2 bt b--black-20">
                        <a className="f6 db link dark-blue hover-blue" href="#">{activity.type}</a>
                        <p className="f6 gray mv1">{activity.description}</p>
                        <button type="submit" className="link tc ph3 pv1 db bg-animate bg-dark-blue hover-bg-blue white f6 br1" onClick={this.getEntries}>See tracked data</button>
                        <button className="link tc ph3 pv1 db bg-animate bg-dark-blue hover-bg-blue white f6 br1" onClick={this._handleDelete}>delete activity</button>
                    </div>

                </article>
            </section>
        )
    }
}

export default ActivityCard;


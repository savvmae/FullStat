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
            <div className="dt dt--fixed">
            <section className="tc pa3 pa5-ns dtc tc pv4">
                <article className="hide-child relative ba b--black-20 mw5 center bg-whitee">
                    <img className="padding" src="./running-man.png"/>
                    <div className="pa2 b--black-20">
                        <a className="f6 db link dark-blue hover-blue nike" href="#">{activity.type}</a>
                        <p className="f6 gray mv1">{activity.description}</p>
                        <div className="flex-center">
                        <button type="submit" className="link tc ph3 pv1 db bg-animate bg-green hover-bg-blue white f6 br1 nike" onClick={this.getEntries}>SEE TRACKED DATA</button>
                        <button className="link tc ph3 pv1 db bg-animate bg-green hover-bg-blue white f6 br1 nike" onClick={this._handleDelete}>DELETE ACTIVITY</button>
                        </div>
                    </div>

                </article>
            </section>
            </div>
        )
    }
}

export default ActivityCard;


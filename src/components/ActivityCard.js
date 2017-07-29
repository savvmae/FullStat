import React, { Component } from 'react';
import axios from 'axios';

class ActivityCard extends Component {
    constructor(props) {
        super(props);
    }

    _handleDelete = (event) => {
        event.preventDefault();
        let deleteRoute = `/api/activities/${this.props.activity._id}`
        axios.delete(deleteRoute).then(response => {
            this.props.getAllItems();
        })
    }
    

    render() {
        const { activity } = this.props
        return (
            <section className="tc pa3 pa5-ns">
                <article className="hide-child relative ba b--black-20 mw5 center">
                    <img src="https://scontent.flhr3-1.fna.fbcdn.net/v/t1.0-1/p320x320/10419949_10105372167674736_5929675618317299881_n.jpg?oh=fa3bbf4311e61e4637b67ef3be89479f&oe=58C28705" className="db" alt="Photo of Jesse Grant" />
                    <div className="pa2 bt b--black-20">
                        <a className="f6 db link dark-blue hover-blue" href="#">{activity.type}</a>
                        <p className="f6 gray mv1">{activity.description}</p>
                        <a className="link tc ph3 pv1 db bg-animate bg-dark-blue hover-bg-blue white f6 br1" href="#">See tracked data</a>
                    </div>
                    
                </article>
            </section>
        )
    }
}

export default ActivityCard;


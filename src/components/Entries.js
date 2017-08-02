import React, { Component } from 'react';
import axios from 'axios';

import EntryCard from './EntryCard';

class Entries extends Component {
    constructor(props) {
        super(props)

        this.state = {
            entries: []
        }
    }

    componentWillMount = () => {
        let route = `/api/activities/${localStorage.activity}`;
        var AuthStr = 'JWT '.concat(localStorage.token);
        var userInfo = JSON.parse(localStorage.getItem('id'))
        var userId = userInfo.id
        axios.get(route,  { headers: { Authorization: AuthStr } })
        .then(response => {
            this.setState({ entries: response.data });
        }).catch((err) => {
        console.log(err.response.data.message);
        this.setState({ error: err.response.data.message })
        if (err.response.status === 401) {
          window.location.pathname = "/"
        }
      })
    }


    render() {
        let renderEntries = this.state.entries.map((entry) => {
            return <EntryCard key={entry._id} entry={entry} />
        })
        return (
            <div>
                <h1> My Activities </h1>

                <div className="row">
                    <ul className="list pl0 mt0 measure center">
                        {renderEntries}
                    </ul>
                </div>


            </div>
        );
    }
}


export default Entries;
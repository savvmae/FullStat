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
        axios.get(route).then(response => {
            this.setState({ entries: response.data });
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
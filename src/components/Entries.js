import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import _ from 'underscore';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import EntryCard from './EntryCard';

class Entries extends Component {
    constructor(props) {
        super(props)

        this.state = {
            entries: [],
            startDate: moment(),
            quantity: 0,
            postError: '',
            error: ''
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(date) {
        this.setState({
            startDate: date
        });
    }
    handleQuantity = (event) => {
        this.setState({
            quantity: event.target.value
        })
    }
    clearNum = (event) => {
        event.target.value = ''
    }
    putNum = (event) => {
        if (event.target.value === '') {
            event.target.value = this.state.quantity
        }
    }
    handleSubmit = (event) => {
        event.preventDefault();
        var AuthStr = 'JWT '.concat(localStorage.token);
        var userInfo = JSON.parse(localStorage.getItem('id'))
        var userId = userInfo.id
        axios({
            method: 'post',
            url: '/api/activities/' + localStorage.activity + '/entries',
            headers: { Authorization: AuthStr },
            data: {
                date: this.state.startDate,
                quantity: this.state.quantity
            }
        }).then(serverResponse => {
            console.log(serverResponse);
            this.componentWillMount();
            this.setState({ startDate: moment(), quantity: 0, postError: '' })
        }).catch((err) => {
                this.setState({ postError: err.response.data.message })
        })
    }

    componentWillMount = () => {
        let route = `/api/activities/${localStorage.activity}`;
        var AuthStr = 'JWT '.concat(localStorage.token);
        var userInfo = JSON.parse(localStorage.getItem('id'))
        var userId = userInfo.id
        axios.get(route, { headers: { Authorization: AuthStr } })
            .then(response => {
                var dates = _.sortBy(response.data, 'date');
                this.setState({ entries: dates, error: '', postError: '' });
            }).catch((err) => {
                this.setState({ error: err.response.data.message })
                if (err.response.status === 401) {
                    window.location.pathname = "/"
                }
            })
    }

    render() {
        let renderEntries = this.state.entries.map((entry) => {
            return <EntryCard key={entry._id} entry={entry} activityId={localStorage.activity} />
        })
        return (

            <div className="ent-wrapper">
                <div className="main">
                    <div className="nike large ent-head">
                        
                        {this.state.error ? <div> <p> {this.state.error} </p> <p> To get started, add an entry! </p> </div> : <div> My Entries for {localStorage.activityT} </div> }

                    </div>
                    <ul className="list pl0 mt0 forty center">
                        {renderEntries}
                    </ul>
                </div>
                <div className="small-sec">
                    <main className="pa4 black-80">
                        <form className="measure center">
                            <fieldset className="ba b--transparent ph0 mh0 " >
                                <legend className="f4 fw6 ph0 mh0 rosy form-title title-medium">Add a new date entry or update an existing one</legend>
                                {this.state.postError ? <h1 className="f4 fw6 ph0 mh0 rosy form-title title-medium"> {this.state.postError} </h1> : null}
                                <div className="mt3 left">
                                    <label className="db fw6 lh-copy f6 form-title ent-title" htmlFor="activity">Choose a date!</label>
                                    <DatePicker className="left hover-bg-grayy hover-white pa2 ba"
                                        selected={this.state.startDate}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div className="mv3 left">
                                    <label className="db fw6 lh-copy f6 form-title ent-title" htmlFor="description">Add Quantity!</label>
                                    <input onChange={this.handleQuantity} onFocus={this.clearNum} onBlur={this.putNum} className="b pa2 input-reset ba hover-bg-grayy hover-white w-100 quant left" type="number" name="description" id="description" value={this.state.quantity} />
                                </div>
                            </fieldset>
                            <div className="left top">
                                <input onClick={this.handleSubmit} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib form-title" type="submit" />
                            </div>
                        </form>
                    </main>
                </div>
            </div>
        );
    }
}

export default Entries;
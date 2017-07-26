import React, { Component } from 'react';
import Layout from './Layout.js';

import axios from 'axios';

class Signup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userName: '',
            email: '',
            password: ''
        }
    }
    handleEmail = (event) => {
        this.setState({ email: event.target.value });
    }
    handleUN = (event) => {
        this.setState({ userName: event.target.value });
    }
    handlePW = (event) => {
        this.setState({ password: event.target.value });
    }
    handleSubmit = (event) => {
        event.preventDefault();
        axios.post('/api/signup', {

            userName: this.state.userName,
            email: this.state.email,
            password: this.state.password

        }).then(serverResponse => {
            if (serverResponse.data.message === "ok") {
                window.location.pathname = '/home';

            }
        })

    }
    render() {
        return (
            <Layout>
                <div className="Signup">
                    <form onSubmit={this.handleSubmit}>
                        <input onChange={this.handleUN} type="text" name="userName" value={this.state.userName} placeholder="User Name: " />
                        <input onChange={this.handleEmail} type="text" name="email" value={this.state.email} placeholder="Email: " />
                        <input onChange={this.handlePW} type="password" name="password" value={this.state.password} placeholder="Password: " />
                        <button type="submit">Signup</button>
                    </form>
                </div>
            </Layout>
        );
    }
}

export default Signup;

import React, { Component } from 'react';
import Layout from './Layout.js';

import axios from 'axios';
// store token in local storage, use token to request info from server
class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            error: ''
        }
    }
    handleEmail = (event) => {
        this.setState({ email: event.target.value });
    }
    handlePW = (event) => {
        this.setState({ password: event.target.value });
    }
    handleSubmit = (event) => {
        event.preventDefault();
        axios.post('/api/login', {
            email: this.state.email,
            password: this.state.password

        }).then(serverResponse => {
            
            if (serverResponse.data.message === "ok") {
                var encrypted = serverResponse.data.token.split('.');
                var decryptedPL = atob(encrypted[1]);
                
                localStorage.setItem("token", serverResponse.data.token)
                localStorage.setItem("id", decryptedPL)
                window.location.pathname = '/home';
            }
        }).catch((err) => {
            console.log(err.response);
            this.setState({ error: err.response.data.message })
        })

    }
    render() {
        return (

                    <div className="Login">
                        {this.state.error ? <h1>error message here </h1> : null }
                        <form onSubmit={this.handleSubmit}>
                            <input onChange={this.handleEmail} type="text" name="email" value={this.state.email} placeholder="Email: " />
                            <input onChange={this.handlePW} type="password" name="password" value={this.state.password} placeholder="Password: " />
                            <button type="submit">Login</button>
                        </form>
                    </div>
        );
    }
}

export default Login;

import React, { Component } from 'react';
import Layout from './Layout.js';

import axios from 'axios';

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
            console.log(serverResponse)
            if (serverResponse.data.message === "ok") {
                window.location.pathname = '/home';
            }
            // else if (serverResponse.status === 401){
                
            //     this.setState({ error: serverResponse.data.message })
            // }
        })

    }
    render() {
        return (
            <Layout>
                {this.state.error.length > 1 ?

                    <div className="Login">

                        <form onSubmit={this.handleSubmit}>
                            <input onChange={this.handleEmail} type="text" name="email" value={this.state.email} placeholder="Email: " />
                            <input onChange={this.handlePW} type="password" name="password" value={this.state.password} placeholder="Password: " />
                            <button type="submit">Login</button>
                        </form>
                    </div>
                    :
                    <div className="Login">
                        <h1>{this.state.error}</h1>
                        <form onSubmit={this.handleSubmit}>
                            <input onChange={this.handleEmail} type="text" name="email" value={this.state.email} placeholder="Email: " />
                            <input onChange={this.handlePW} type="password" name="password" value={this.state.password} placeholder="Password: " />
                            <button type="submit">Login</button>
                        </form>
                    </div>}
            </Layout>
        );
    }
}

export default Login;

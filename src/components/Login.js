import React, { Component } from 'react';
import { Link } from 'react-router-dom';


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
        console.log(this.state);
        axios.post('/api/login', {
            email: this.state.email,
            password: this.state.password

        }).then(serverResponse => {
            console.log(serverResponse)
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
            <div className="backdrop">
                <div className="container-center">
                    <main className="pa4 black-80">
                        {this.state.error ? <h1 className="nike medium"> {this.state.error} </h1> : null}
                        <form onSubmit={this.handleSubmit} className="measure center">
                            <fieldset id="sign_up" className="ba b--transparent ph0 mh0" />
                            <legend className="f4 ph0 mh0 card-title-center nike large">Login</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input onChange={this.handleEmail} type="text" name="email" value={this.state.email} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" id="email-address" />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input onChange={this.handlePW} type="password" name="password" value={this.state.password} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" id="password" />
                            </div>

                            <div className="">
                                <input onSubmit={this.handleSubmit} className="ph3 pv2 input-reset ba b--black bg-transparent grow pointer dib nike medium" type="submit" value="Sign in" />
                            </div>
                            <div className="lh-copy mt3">
                                Don't have an account? <Link to='./signup' className="log-in-button ph3 pv2 input-reset ba b--black bg-transparent grow pointer dib nike medium">Sign up</Link>

                            </div>
                        </form>
                    </main>
                </div>
            </div>
        );
    }
}

export default Login;

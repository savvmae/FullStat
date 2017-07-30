import React, { Component } from 'react';
import {Link} from 'react-router-dom';

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
                localStorage.token = serverResponse.data.token;
                window.location.pathname = '/home';
            }
        })
            .catch((err) => {
                console.log(err.response);
                this.setState({ error: err.response.data.message })
            })
    }
    render() {
        return (

            <main className="pa4 black-80">
                {this.state.error ? <h1> {this.state.error} </h1> : null}
                <form onSubmit={this.handleSubmit} className="measure center">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0" />
                    <legend className="f4 fw6 ph0 mh0">Signup</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                        <input onChange={this.handleEmail} type="text" name="email" value={this.state.email} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" id="email-address" />
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                        <input onChange={this.handlePW} type="password" name="password" value={this.state.password} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" id="password" />
                    </div>

                    <div className="">
                        <input onSubmit={this.handleSubmit} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Signup" />
                    </div>
                    <div className="lh-copy mt3">
                        Already have an account? <Link to='./signup' className="f6 link dim black db"> Log in</Link>

                    </div>
                </form>
            </main>

        );
    }
}

export default Signup;

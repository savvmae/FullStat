import React, { Component } from 'react';

import { NavLink } from 'react-router-dom';


export default class Header extends Component {

    handleLogout = (event) => {
        event.preventDefault();
        localStorage.clear();
        console.log(localStorage);
        window.location.pathname = '/';
    }
    render() {
        return (
            <div>
            {localStorage.id ? 
            <header className="bg-black-90 fixed w-100 ph3 pv3 pv4-ns ph4-m ph5-l">
            
                <nav className="f6 fw6 ttu tracked">
                
                    <NavLink to="/home" className="link dim white dib mr3" title="Home">Home</NavLink>
                    <a className="link dim white dib mr3" href="#" title="About">About</a>
                    <a className="link dim white dib mr3" href="#" title="Store">Store</a>
                    <a className="link dim white dib" href="#" title="Contact">Contact</a>
                    <button onClick={this.handleLogout} type="submit" className="link dim white dib">Logout</button>
                </nav>
                
            </header>
            : null }
            </div>
        );
    }
}



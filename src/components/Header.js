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
            <header className="bg-black z-ind fixed w-100 ph3 pv3 pv4-ns ph4-m ph5-l">
            
                <nav className="flex row f6 fw6 ttu tracked">
                    
                    <NavLink to="/home" activeStyle={{color: "gray"}}className="link dim white dib mr3" title="Home">Home</NavLink>
                    <div>
                    <button onClick={this.handleLogout} type="submit" className="button link dim white dib">Logout</button>
                    </div>
                </nav>
                
            </header>   
            : null }
            </div>
        );
    }
}
// <img className="logo" src="./logo-fb.gif" />



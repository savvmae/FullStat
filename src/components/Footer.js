import React, { Component } from 'react';



export default class BaseLayout extends Component {
    render() {

        return (
            <footer className="footer z-ind">
                <div className="row">
                    <div className="col-lg-12">
                        <p>Copyright &copy; Full Stat 2017</p>
                    </div>
                </div>
            </footer>
        );
    }
}
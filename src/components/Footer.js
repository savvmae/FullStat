import React, { Component } from 'react';



export default class BaseLayout extends Component {
    render() {

        return (
            <footer className="footer z-ind rose white-f f-r">
                <div className="row">
                    <div className="col-lg-12 wrapper f-wr">
                        <p className="footer-p">Copyright &copy; Full Stat 2017</p>
                        <p>Developed by <a className="footer-a" href="http://savannahcosby.com">Savannah Cosby</a></p>
                    </div>
                </div>
            </footer>
        );
    }
}
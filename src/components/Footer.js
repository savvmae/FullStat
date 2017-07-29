import React, { Component } from 'react';



export default class BaseLayout extends Component {
    render() {

        return (
            <footer>
                <div className="row">
                    <div className="col-lg-12">
                        <p>Copyright &copy; Dogs R Us 2014</p>
                    </div>
                </div>
            </footer>
        );
    }
}
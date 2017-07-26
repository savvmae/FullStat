import React, { Component } from 'react';

export default class Layout extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <h1> Welcome to (think of good name)</h1>

                {this.props.children}

                <h1>Put footer stuff here</h1>
            </div>
        )
    }
}
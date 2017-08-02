import React, { Component } from 'react';

import Header from './Header';
import Footer from './Footer';


export default class Layout extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                {localStorage.id ?
                    <div>
                        <Header />

                        {this.props.children}

                        <Footer />
                    </div>
                    :
                    <div>
                        {this.props.children}
                        <Footer />
                    </div>
                }
            </div>
        )
    }
}
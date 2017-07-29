import React, { Component } from 'react';
// import axios from 'axios';

import EntryCard from './ActivityCard';

class Entries extends Component {
    constructor(props){
    super(props)

    this.state = {
      activities: ''
    }
  }
  
  componentWillMount = () => {
    var id = ;
        axios.get('/api/activities/' + id )
        .then(serverResponse => {
          
          if(serverResponse.status === 200){
            this.setState({activities: serverResponse.data});
            console.log(this.state)
            
          }
            
        }).catch((err) => {
            console.log(err.response.data.message);
            this.setState({ error: err.response.data.message })
            if (err.response.status === 401){
              window.location.pathname = "/"
            }
        })

    }
  render() {
    return (
      <div >
        
      </div>
    );
  }
}

export default Entries;
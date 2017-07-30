import React, { Component } from 'react';
import axios from 'axios';

import ActivityCard from './ActivityCard';

class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      activities: []
    }
  }
  
  componentWillMount = () => {
    if(!localStorage.id){
      window.location.pathname = '/';
    }
    var id = localStorage.id.split(',')[0].split('"')[3];
        axios.get('/api/users/' + id + '/activities')
        .then(serverResponse => {
          
          if(serverResponse.status === 200){
            this.setState({activities: serverResponse.data});    
          }
            
        }).catch((err) => {
            console.log(err.response.data.message);
            this.setState({ error: err.response.data.message })
            // if (err.response.status === 401){
            //   window.location.pathname = "/"
            // }
        })

    }
  render() {
    let renderActivities = this.state.activities.map((activity) => {
        return <ActivityCard key={activity._id} activity={activity} />
    })
    return (
        <div>
            <h1> My Activities </h1>
            {this.state.error ? <h1>{this.state.error} </h1> : null}
            <div className="row">
            {renderActivities}
            </div>


        </div>
    );
  }
}

export default App;

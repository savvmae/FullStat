import React, { Component } from 'react';
import axios from 'axios';

import ActivityCard from './ActivityCard';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      activities: [],
      newActivityName: '',
      newActivityDescription: '',
      error: '',
      postError: ''
    }
  }

  componentWillMount = () => {
    if (!localStorage.id) {
      window.location.pathname = '/';
    }
    var AuthStr = 'JWT '.concat(localStorage.token);
    var userInfo = JSON.parse(localStorage.getItem('id'))
    var userId = userInfo.id
    axios.get('/api/users/' + userId + '/activities', { headers: { Authorization: AuthStr } })
      .then(serverResponse => {

        if (serverResponse.status === 200) {
          this.setState({ activities: serverResponse.data });
        }

      }).catch((err) => {
        console.log(err.response.data.message);
        this.setState({ error: err.response.data.message })
        if (err.response.status === 401) {
          window.location.pathname = "/"
        }
      })

  }
  handleActName = (event) => {
    this.setState({ newActivityName: event.target.value });
  }
  handleActDescription = (event) => {
    this.setState({ newActivityDescription: event.target.value });
  }
  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
    var AuthStr = 'JWT '.concat(localStorage.token);
    var userInfo = JSON.parse(localStorage.getItem('id'))
    var userId = userInfo.id
    axios({
      method: 'post',
      url: '/api/users/' + userId + '/activities', 
      headers: { Authorization: AuthStr } ,
      data: {
        type: this.state.newActivityName,
        description: this.state.newActivityDescription
      }}).then(serverResponse => {
      this.componentWillMount();
      this.setState({newActivityDescription: '', newActivityName: ''})
    })
}
render() {
  let renderActivities = this.state.activities.map((activity) => {
    return <ActivityCard key={activity._id} activity={activity} />
  })
  return (
    <div className="wrapper">
      <div className="main-right">
        <h1> My Activities </h1>
        {this.state.error ? <h1>{this.state.error} </h1> : null}
        <div className="wrapper">
          {renderActivities}
        </div>

      </div>
      <div className="small-left">
        <main className="pa4 black-80">
          <form className="measure center">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0" >
              <legend className="f4 fw6 ph0 mh0 rosy">Add A New Activity</legend>
              {this.state.postError ? <h1> {this.state.postError} </h1> : null}
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="activity">Activity Name</label>
                <input onChange={this.handleActName} className="pa2 input-reset ba bg-transparent hover-bg-blue hover-white w-100" type="text" name="activity-name" id="activity name" value={this.state.newActivityName} />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="description">Description</label>
                <input onChange={this.handleActDescription} className="b pa2 input-reset ba bg-transparent hover-bg-blue hover-white w-100" type="text" name="description" id="description" value={this.state.newActivityDescription} />
              </div>
            </fieldset>
            <div className="">
              <input onClick={this.handleSubmit} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" />
            </div>
          </form>
        </main>
      </div>
    </div>

  );
}
}

export default App;

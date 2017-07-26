
import React from 'react';
import ReactDOM from 'react-dom';

//import Styles
import './styles/index.css';

//import React Router
import {BrowserRouter, Route, Switch} from 'react-router-dom';

//import Components
import App from './components/App';
import Signup from './components/Signup';
import Login from './components/Login';


//wrap our <Route> components with <BrowserRouter> component.
ReactDOM.render(
 <BrowserRouter>
   <Switch>
     <Route path="/login" component={Login} />
     <Route path="/signup" component={Signup} />
     <Route path="/home" component={App}/>
   </Switch>
 </BrowserRouter>

, document.getElementById('root'));
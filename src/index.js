
import React from 'react';
import ReactDOM from 'react-dom';

//import Styles
import './styles/index.css';
import './styles/App.css';

//import React Router
import { BrowserRouter, Route, Switch } from 'react-router-dom';

//import Components
import App from './components/App';
import Signup from './components/Signup';
import Login from './components/Login';
import Entries from './components/Entries';
import Layout from './components/Layout';

//wrap our <Route> components with <BrowserRouter> component.
ReactDOM.render(
    <BrowserRouter>
        <Layout>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/:id" component={App} />
                <Route exact path="/activities/:id" component={Entries} />
            </Switch>
        </Layout>
    </BrowserRouter>

    , document.getElementById('root'));
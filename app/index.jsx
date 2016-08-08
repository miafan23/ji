const React = require('react');
const ReactDom = require('react-dom');
const Register = require('./auth/register');
const Index = require('./index/index');
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { Router, Route, Link } from 'react-router'

// import Register from './components/auth/register';

ReactDom.render((
  <Router history={createBrowserHistory()}>
    <Route path="/" component={Index}>

    </Route>
  </Router>
), document.getElementById('app'))

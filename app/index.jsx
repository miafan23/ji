const React = require('react');
const ReactDom = require('react-dom');
const Register = require('./auth/register');
const Index = require('./index/index');
import { Router, Route, Link, hashHistory } from 'react-router'

// import Register from './components/auth/register';

ReactDom.render((
  <Router>
    <Route path="/" component={Index}>

    </Route>
  </Router>
), document.getElementById('app'))
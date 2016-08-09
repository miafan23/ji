const React = require('react');
const ReactDom = require('react-dom');
const Signup = require('./auth/signup');
const Index = require('./index/index');
import Login from './auth/login';
import { Router, Route, Link, browserHistory, IndexRoute} from 'react-router'

// import Register from './components/auth/signup';

ReactDom.render((
  <Router>
    <Route path="/">
      <IndexRoute component={Index} />
      <Route path="login" component={Login} />
    </Route>
  </Router>
), document.getElementById('app'))

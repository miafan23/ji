const React = require('react');
const ReactDom = require('react-dom');
const Signup = require('./auth/signup');
const Index = require('./index/index');
const $ = require('jquery');
import Login from './auth/login';
import { Router, Route, Link, browserHistory, IndexRoute} from 'react-router'
// import Register from './components/auth/signup';

ReactDom.render((
  <Router history={browserHistory}>
    <Route path="/">
      <IndexRoute component={Index} />
      <Route path="login" component={Login} />
      <Route path="signup" component={Signup} />
    </Route>
  </Router>
), document.getElementById('app'))

function requireAuth(nextState, replaceState, callback) {
  $.ajax({
    url: '/api/checkLogin',
    type: 'POST'
  }).done((data) => {
    if (data === 'unlog') {
      replaceState('/signup');
      callback();
    }
  })
}

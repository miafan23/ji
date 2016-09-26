const React = require('react');
const ReactDom = require('react-dom');
const Signup = require('./auth/signup');
import Login from './auth/login';

import Manage from './manage/manage';
import PendingTasks from './manage/pending';
import FinishedTasks from './manage/finished';

const Index = require('./index/index');
import AppCom from './index/app';

const $ = require('jquery');
import { Router, Route, Link, browserHistory, IndexRoute} from 'react-router'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {red100} from 'material-ui/styles/colors';

var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#4B7C5B',
  },
  appBar: {
    height: 45,
  },
});

const App = () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <Router history={browserHistory}>
      <Route path="/" component={AppCom}>
        <IndexRoute onEnter={requireAuth} component={Index} />
        <Route path="/manage" component={Manage}>
          <IndexRoute component={PendingTasks} />
          <Route path="/manage/finished" component={FinishedTasks} />
        </Route>
        <Route path="/finished" component={FinishedTasks} />
      </Route>
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
    </Router>
  </MuiThemeProvider>
)


ReactDom.render(
  <App />,
  document.getElementById('app'))

function requireAuth(nextState, replaceState, callback) {
  $.ajax({
    url: '/api/checkLogin',
    type: 'POST'
  }).done((data) => {
    if (data === 'unlog') {
      replaceState('/signup');
    }
    callback();
  })
}

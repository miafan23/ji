const React = require('react');
const ReactDom = require('react-dom');
const Signup = require('./auth/signup');
const Index = require('./index/index');
import { Manage } from './auth/manage';
const $ = require('jquery');
import Login from './auth/login';
import { Router, Route, Link, browserHistory, IndexRoute} from 'react-router'
// import Register from './components/auth/signup';
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


// const App = () => (
//   <MuiThemeProvider muiTheme={muiTheme}>
//       <Router history={browserHistory}>
//       <Route path="/">
//         <IndexRoute onEnter={requireAuth} component={Index} />
//         <Route path="login" component={Login} />
//         <Route path="signup" component={Signup} />
//         <Route path="manage" component={Manage} />
//       </Route>
//     </Router>
//   </MuiThemeProvider>
// )

const App = () => (
  <MuiThemeProvider muiTheme={muiTheme}>
      <Router history={browserHistory}>
      <Route path="/" component={AppCom}>
        <IndexRoute onEnter={requireAuth} component={Index} />
        <Route path="login" component={Login} />
        <Route path="signup" component={Signup} />
        <Route path="manage" component={Manage} />
      </Route>
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

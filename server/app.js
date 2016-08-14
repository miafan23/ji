const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const config = require('config-lite');
// console.log(config);
// app.use(compression());
app.use(bodyParser());
app.use(cookieParser());
// app.use(passport.initialize());
// app.use(passport.session());
app.use(session({
  secret: 'ji',
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 30 }
}));
app.use(express.static(__dirname + '/../dist'));
// app.use(flash());

//passport config
// const User = require('./models/user');
// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

require('./router')(app);

app.listen(config.port, function () {
  console.log('Server listening on: ', config.port);
});

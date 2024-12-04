const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./connection');

const sessionConfig = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
  cookie: {
    httpOnly: true,
    secure: false,  // Set to true in production with HTTPS
    maxAge: 1000 * 60 * 60,  // 1 hour
  },
};

module.exports = sessionConfig;

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
const passport = require('passport');
const session = require('express-session');
const Redis = require('ioredis');
const RedisStore = require('connect-redis')(session);

const app = express();
const port = 5000;
const redisClient = new Redis();
const sess = {
  store: new RedisStore({ client: redisClient }),
  secret: process.env.SESSION_SECRET,
  name: 'sessionID',
  resave: true, // Setting resave and rolling means the cookie will be refreshed
  rolling: true, // on subequent requests, stopping the user's session ending during usage.
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 60 * 60 * 1000, // Cookie expires after 1h, unless refreshed (see above).
    secure: process.env.NODE_ENV === 'production'
  }
};

// Express Middleware
app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: 'http://localhost:3000', // Location of the frontend
    credentials: true
  })
);
app.use(session(sess));
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(passport.initialize());
app.use(passport.session());
app.disable('x-powered-by');

// Routes
const auth = require('./routes/auth');
app.use('/auth', auth);

const invitees = require('./routes/invitees');
app.use('/invitees', invitees);

const houses = require('./routes/houses');
app.use('/houses', houses);

const rooms = require('./routes/rooms');
app.use('/rooms', rooms);

// Start Server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

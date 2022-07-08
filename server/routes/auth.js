const express = require('express');
const passport = require('passport');
const router = express.Router();
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');
const db = require('../db');

// Passport Configuration
passport.use(
  new LocalStrategy((username, password, done) => {
    db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
      if (err) return done(err);
      if (!row) return done(null, false, { message: 'Incorrect username or password.' });

      bcrypt.compare(password, row.hashed_password).then((passwordMatch) => {
        if (!passwordMatch) {
          return done(null, false, { message: 'Incorrect username or password.' });
        }
        return done(null, row);
      });
    });
  })
);

passport.serializeUser((user, cb) => {
  process.nextTick(() => {
    cb(null, user.id);
  });
});

passport.deserializeUser((id, cb) => {
  process.nextTick(() => {
    db.get('SELECT * FROM users WHERE id = ?', [id], (err, row) => {
      const userInfo = { username: row.username };
      cb(err, userInfo);
    });
  });
});

// Router Setup
router.post('/register', (req, res, next) => {
  const { username, password } = req.body;
  db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
    if (err) return next(err);
    if (row) return res.status(409).send({ message: 'User already exists.' });

    bcrypt.hash(password, 10).then((hash) => {
      db.run(
        'INSERT INTO users (username, hashed_password) VALUES (?, ?)',
        [username, hash],
        (err) => {
          if (err) next(err);
          res.status(201).send({ message: 'User successfully created.' });
        }
      );
    });
  });
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).send(info);

    req.login(user, (err) => {
      if (err) return next(err);
      res.send({ message: 'Successfully authenticated.', ...req.user });
    });
  })(req, res, next);
});

router.post('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.send({ message: 'Successfully logged out.' });
  });
});

router.get('/user', (req, res) => {
  res.send(req.user);
});

router.get('/session', (req, res) => {
  res.send(req.session);
});

module.exports = router;

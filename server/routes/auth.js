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
      const userInfo = { username: row.username, role: row.role };
      cb(err, userInfo);
    });
  });
});

// Router Setup
router.post('/register', (req, res, next) => {
  const { username, password, role } = req.body;
  db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
    if (err) return next(err);
    if (row) return res.status(409).send({ message: 'User already exists.' });

    bcrypt.hash(password, 10).then((hash) => {
      db.run(
        'INSERT INTO users (username, hashed_password, role) VALUES (?, ?, ?)',
        [username, hash, role],
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
    if (!user) return res.status(401).json(info);

    req.login(user, (err) => {
      if (err) return next(err);
      const { username, role } = req.user;
      res.json({ message: 'User successfully authenticated.', role, username });
    });
  })(req, res, next);
});

router.post('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.json({ message: 'User successfully logged out.' });
  });
});

router.get('/user', (req, res) => {
  res.json(req.user);
});

router.get('/session', (req, res) => {
  res.json(req.session);
});

module.exports = router;

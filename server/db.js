const sqlite3 = require('sqlite3');
const mkdirp = require('mkdirp');
const bcrypt = require('bcrypt');

mkdirp.sync('./var/db');

const db = new sqlite3.Database('./var/db/wedding.db');

db.serialize(function () {
  // Enable foreign keys support
  db.get('PRAGMA foreign_keys = ON');

  db.run(
    'CREATE TABLE IF NOT EXISTS users ( \
    id INTEGER PRIMARY KEY, \
    username TEXT UNIQUE NOT NULL, \
    hashed_password BLOB NOT NULL, \
    role TEXT NOT NULL \
  )'
  );

  db.run(
    'CREATE TABLE IF NOT EXISTS invitees ( \
    id INTEGER PRIMARY KEY, \
    first_name TEXT NOT NULL, \
    last_name TEXT NOT NULL, \
    rsvp BOOLEAN, \
    user_id INTEGER, \
    room_id INTEGER, \
    FOREIGN KEY(user_id) REFERENCES users(id), \
    FOREIGN KEY(room_id) REFERENCES rooms(id) \
  )'
  );

  db.run(
    'CREATE TABLE IF NOT EXISTS houses ( \
    id INTEGER PRIMARY KEY, \
    name TEXT UNIQUE NOT NULL \
  )'
  );

  db.run(
    'CREATE TABLE IF NOT EXISTS rooms ( \
    id INTEGER PRIMARY KEY, \
    name TEXT UNIQUE NOT NULL, \
    house_id INTEGER NOT NULL, \
    FOREIGN KEY(house_id) REFERENCES houses(id) \
  )'
  );

  bcrypt
    .hash(process.env.DEFAULT_PASSWORD, 10)
    .then((hash) =>
      db.run('INSERT OR IGNORE INTO users (username, hashed_password, role) VALUES (?, ?, ?)', [
        process.env.DEFAULT_USERNAME,
        hash,
        'admin'
      ])
    );
});

module.exports = db;

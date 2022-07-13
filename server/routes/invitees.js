const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res, next) => {
  db.all('SELECT * FROM invitees', (err, rows) => {
    if (err) return next(err);
    return res.json(rows);
  });
});

router.post('/', (req, res, next) => {
  const { firstName, lastName, userId, roomId } = req.body;
  const rsvp = null; // Default status, true == Yes, false == No
  db.get(
    'INSERT INTO invitees \
    (first_name, last_name, rsvp, user_id, room_id) \
    VALUES (?, ?, ?, ?, ?)',
    [firstName, lastName, rsvp, userId, roomId],
    (err) => {
      if (err) return next(err);
      return res.status(201).json({ message: 'Invitee successfully created.' });
    }
  );
});

router.put('/:id', (req, res, next) => {
  const { firstName, lastName, rsvp, userId, roomId } = req.body;
  const { id } = req.params;
  db.get(
    'UPDATE invitees SET \
    first_name = COALESCE(?, first_name), \
    last_name = COALESCE(?, last_name), \
    rsvp = COALESCE(?, rsvp), \
    user_id = COALESCE(?, user_id), \
    room_id = COALESCE(?, room_id) \
    WHERE id = ?',
    [firstName, lastName, rsvp, userId, roomId, id],
    (err, row) => {
      console.log(row);
      if (err) return next(err);
      return res.status(200).json({ message: 'Invitee successfully updated.' });
    }
  );
});

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  db.get('SELECT * FROM invitees WHERE id = ?', [id], (err, row) => {
    if (err) return next(err);
    return res.json(row);
  });
});

router.delete('/:id', (req, res, next) => {
  const { id } = req.params;
  db.get('DELETE FROM invitees WHERE id = ?', [id], (err) => {
    if (err) return next(err);
    return res.status(204).end();
  });
});

module.exports = router;

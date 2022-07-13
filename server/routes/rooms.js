const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res, next) => {
  db.all('SELECT * FROM rooms', (err, rows) => {
    if (err) return next(err);
    return res.json(rows);
  });
});

router.post('/', (req, res, next) => {
  const { name, houseId } = req.body;
  db.get('INSERT INTO rooms (name, house_id) VALUES (?, ?)', [name, houseId], (err) => {
    if (err) return next(err);
    return res.status(201).json({ message: 'Room successfully created.' });
  });
});

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  db.get('SELECT * FROM rooms WHERE id = ?', [id], (err, row) => {
    if (err) return next(err);
    return res.json(row);
  });
});

router.put('/:id', (req, res, next) => {
  const { name } = req.body;
  const { id } = req.params;
  db.get('UPDATE rooms SET \
      name = ? \
      WHERE id = ?', [name, id], (err, row) => {
    console.log(row);
    if (err) return next(err);
    return res.status(200).json({ message: 'Room successfully updated.' });
  });
});

router.delete('/:id', (req, res, next) => {
  const { id } = req.params;
  db.get('DELETE FROM rooms WHERE id = ?', [id], (err) => {
    if (err) return next(err);
    return res.status(204).end();
  });
});

module.exports = router;

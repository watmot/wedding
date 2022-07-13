const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res, next) => {
  db.all('SELECT * FROM houses', (err, rows) => {
    if (err) return next(err);
    return res.json(rows);
  });
});

router.post('/', (req, res, next) => {
  const { name } = req.body;
  db.get('INSERT INTO houses (name) VALUES (?)', [name], (err) => {
    if (err) return next(err);
    return res.status(201).json({ message: 'House successfully created.' });
  });
});

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  db.get('SELECT * FROM houses WHERE id = ?', [id], (err, row) => {
    if (err) return next(err);
    return res.json(row);
  });
});

router.put('/:id', (req, res, next) => {
  const { name } = req.body;
  const { id } = req.params;
  db.get('UPDATE houses SET \
      name = ? \
      WHERE id = ?', [name, id], (err, row) => {
    console.log(row);
    if (err) return next(err);
    return res.status(200).json({ message: 'House successfully updated.' });
  });
});

router.delete('/:id', (req, res, next) => {
  const { id } = req.params;
  db.get('DELETE FROM houses WHERE id = ?', [id], (err) => {
    if (err) return next(err);
    return res.status(204).end();
  });
});

module.exports = router;

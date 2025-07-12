const db = require('../models/db');

exports.getAll = async (req, res) => {
  const { rows } = await db.query('SELECT * FROM restaurants');
  res.json(rows);
};

exports.create = async (req, res) => {
  const { name, address, phone } = req.body;
  const { rows } = await db.query(
    'INSERT INTO restaurants (name, address, phone) VALUES ($1, $2, $3) RETURNING *',
    [name, address, phone]
  );
  res.status(201).json(rows[0]);
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { name, address, phone } = req.body;
  const { rows } = await db.query(
    'UPDATE restaurants SET name=$1, address=$2, phone=$3 WHERE id=$4 RETURNING *',
    [name, address, phone, id]
  );
  res.json(rows[0]);
};

exports.remove = async (req, res) => {
  const { id } = req.params;
  await db.query('DELETE FROM restaurants WHERE id=$1', [id]);
  res.json({ message: 'Restaurant Deleted' });
};


const db = require('../models/db');

exports.getAll = async (req, res) => {
  const { rows } = await db.query('SELECT * FROM customers');
  res.json(rows);
};

exports.create = async (req, res) => {
  const { name, phone } = req.body;
  const { rows } = await db.query(
    'INSERT INTO customers (name, phone) VALUES ($1, $2) RETURNING *',
    [name, phone]
  );
  res.status(201).json(rows[0]);
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { name, phone } = req.body;
  const { rows } = await db.query(
    'UPDATE customers SET name=$1, phone=$2 WHERE id=$3 RETURNING *',
    [name, phone, id]
  );
  res.json(rows[0]);
};

exports.remove = async (req, res) => {
  const { id } = req.params;
  await db.query('DELETE FROM customers WHERE id=$1', [id]);
  res.json({ message: 'Customer Deleted' });
};

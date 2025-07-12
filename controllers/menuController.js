const db = require('../models/db');

exports.getByRestaurant = async (req, res) => {
  const { id } = req.params;
  const { rows } = await db.query('SELECT * FROM menu_items WHERE restaurant_id = $1', [id]);
  res.json(rows);
};

exports.create = async (req, res) => {
  const { restaurant_id, name, description, price } = req.body;
  const { rows } = await db.query(
    'INSERT INTO menu_items (restaurant_id, name, description, price) VALUES ($1, $2, $3, $4) RETURNING *',
    [restaurant_id, name, description, price]
  );
  res.status(201).json(rows[0]);
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { name, description, price } = req.body;
  const { rows } = await db.query(
    'UPDATE menu_items SET name=$1, description=$2, price=$3 WHERE id=$4 RETURNING *',
    [name, description, price, id]
  );
  res.json(rows[0]);
};

exports.setAvailability = async (req, res) => {
  const { id } = req.params;
  const { is_available } = req.body;
  await db.query('UPDATE menu_items SET is_available=$1 WHERE id=$2', [is_available, id]);
  res.json({ message: 'Availability updated' });
};

exports.remove = async (req, res) => {
  const { id } = req.params;
  await db.query('DELETE FROM menu_items WHERE id=$1', [id]);
  res.json({ message: 'Deleted' });
};

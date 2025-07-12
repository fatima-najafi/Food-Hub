const db = require('../models/db');

exports.getAll = async (req, res) => {
  const { rows } = await db.query('SELECT * FROM orders');
  res.json(rows);
};

exports.getByCustomer = async (req, res) => {
  const { customer_id } = req.params;
  const { rows } = await db.query('SELECT * FROM orders WHERE customer_id = $1', [customer_id]);
  res.json(rows);
};

exports.create = async (req, res) => {
  const { customer_id, restaurant_id, items } = req.body; // items: [{ menu_item_id, quantity }]

  const order = await db.query(
    'INSERT INTO orders (customer_id, restaurant_id) VALUES ($1, $2) RETURNING *',
    [customer_id, restaurant_id]
  );

  const order_id = order.rows[0].id;

  for (const item of items) {
    await db.query(
      'INSERT INTO order_items (order_id, menu_item_id, quantity) VALUES ($1, $2, $3)',
      [order_id, item.menu_item_id, item.quantity]
    );
  }

  res.status(201).json({ message: 'Order placed', order_id });
};

exports.updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  await db.query('UPDATE orders SET status=$1 WHERE id=$2', [status, id]);
  res.json({ message: 'Order status updated' });
};

exports.remove = async (req, res) => {
  const { id } = req.params;
  await db.query('DELETE FROM orders WHERE id=$1', [id]);
  res.json({ message: 'Order deleted' });
};

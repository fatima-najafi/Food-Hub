const express = require('express');
const router = express.Router();
const controller = require('../controllers/orderController');

router.get('/', controller.getAll);
router.get('/customer/:customer_id', controller.getByCustomer);
router.post('/', controller.create);
router.put('/:id/status', controller.updateStatus);
router.delete('/:id', controller.remove);

module.exports = router;
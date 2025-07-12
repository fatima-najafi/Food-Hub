const express = require('express');
const router = express.Router();
const controller = require('../controllers/menuController');

router.get('/restaurant/:id', controller.getByRestaurant);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id/availability', controller.setAvailability);
router.delete('/:id', controller.remove);

module.exports = router;
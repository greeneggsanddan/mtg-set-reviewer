const express = require('express');

const router = express.Router();

// Require controller modules
const setController = require('../controllers/setController');

router.get('/:name', setController.set_get);

router.post('/:name', setController.set_update);

module.exports = router;
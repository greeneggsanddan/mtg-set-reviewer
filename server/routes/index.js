const express = require('express');
const router = express.Router();

const authRouter = require('./auth');
const setsRouter = require('./sets');

router.use('/auth', authRouter);
router.use('/sets', setsRouter);

module.exports = router;

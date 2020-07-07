const express = require('express');
const { check } = require('express-validator');
const router = express.Router();

const auth = require('../middleware/auth');
const { signin, getAuth } = require('../controllers/auth');

router.post('/', signin);

router.get('/:userEmail', auth, getAuth);

module.exports = router;

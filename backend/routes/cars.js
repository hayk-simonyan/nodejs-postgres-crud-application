const express = require('express');
const { check } = require('express-validator');

const router = express.Router();

const { getCars, postCar, putCar, deleteCar } = require('../controllers/cars');
const auth = require('../middleware/auth');

// get all cars
router.get('/', auth, getCars);

// create car
router.post(
  '/',
  [
    check('brand', 'Brand is required').not().isEmpty(),
    check('model', 'Model is required').not().isEmpty(),
    check('released', 'Released year is required').not().isEmpty(),
    check('released', 'Released year should be a number ').isNumeric(),
    check('color', 'Color is required').not().isEmpty(),
  ],
  auth,
  postCar
);

// update car
router.put(
  '/:id',
  [
    check('brand', 'Brand is required').not().isEmpty(),
    check('model', 'Model is required').not().isEmpty(),
    check('released', 'Released year is required').not().isEmpty(),
    check('released', 'Released year should be a number ').isNumeric(),
    check('color', 'Color is required').not().isEmpty(),
  ],
  auth,
  putCar
);

// remove car
router.delete('/:id', auth, deleteCar);

module.exports = router;

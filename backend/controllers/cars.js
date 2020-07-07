const { validationResult } = require('express-validator');

const Car = require('../models/Car');

exports.getCars = async (req, res) => {
  try {
    // get all cars
    const carsList = await Car.findAll();
    res.status(200).json(carsList);
  } catch (error) {
    res.status(500).send('Server error');
    console.log(error);
  }
};

exports.postCar = async (req, res) => {
  // destructuring req body
  const { brand, model, released, color } = req.body;

  try {
    // input validation
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // insert car into the database
    const newCar = await Car.create({
      brand,
      model,
      released,
      color,
    });

    res.status(201).json(newCar);
  } catch (error) {
    res.status(500).send('Server error');
    console.log(error);
  }
};

exports.putCar = async (req, res) => {
  // destructuring car id
  const { id } = req.params;
  // destructuring req body
  const { brand, model, released, color } = req.body;

  try {
    // input validation
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // find by id and update
    const car = await Car.findByPk(id);
    if (!car) {
      return res.status(400).json({ msg: 'No car found with that id' });
    }
    car.brand = brand;
    car.model = model;
    car.released = released;
    car.color = color;
    await car.save();

    res.status(201).json(car);
  } catch (error) {
    res.status(500).send('Server error');
    console.log(error);
  }
};

exports.deleteCar = async (req, res) => {
  // destructuring car id
  const { id } = req.params;

  try {
    // find by id and remove
    const car = await Car.findByPk(id);
    if (!car) {
      return res.status(400).json({ msg: 'No car found with that id' });
    }
    await car.destroy();

    res.status(201).json({ msg: 'Removed car' });
  } catch (error) {
    res.status(500).send('Server error');
    console.log(error);
  }
};

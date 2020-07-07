const jwt = require('jsonwebtoken');
const config = require('config');
const { validationResult } = require('express-validator');

const User = require('../models/User');

exports.getAuth = async (req, res) => {
  try {
    const { userEmail } = req.params;
    const user = await User.findOne({ email: userEmail });
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).send('Server error');
  }
};

exports.signin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { userEmail, userHashId } = req.body;

  try {
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      const newUser = await User.create({
        email: userEmail,
        uid: userHashId,
      });

      const payload = {
        user: {
          id: newUser.id,
        },
      };
      jwt.sign(payload, config.get('jwtSecret'), (err, token) => {
        if (err) throw err;
        return res.status(200).json({ token });
      });
    } else {
      if (userHashId !== user.uid) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid credentials' }] });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({ token });
        }
      );
    }
  } catch (err) {
    console.log(err);
    res.status(500).send('Server error');
  }
};

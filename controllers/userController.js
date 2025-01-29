const {User} = require('../models');
const bcrypt = require('bcryptjs');
const {validateEmail, validatePassword} = require('../helpers/utils');

exports.register = async (req, res) => {
  try {
    const {username, email, password} = req.body;
    if (!validateEmail(email)) {
      res.status(400).send({success: false, message: 'Please, enter a valid email address!'});
      return;
    }
    if (!validatePassword(password)) {
      res.status(400).send({success: false, message: 'Please, enter a valid password!'});
      return;
    }

    const userExists = await User.findOne({where: {email: email}});
    if (userExists) {
      res.status(400).send({success: false, message: 'Email is already in use!'});
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).send({success: true});
  } catch (error) {
    console.log('Error trying to register a new user: ', error.message);
    res
      .status(400)
      .send({success: false, message: 'Something went wrong trying to create a new user'});
  }
};

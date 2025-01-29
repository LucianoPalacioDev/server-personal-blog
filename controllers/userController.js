const {User} = require('../models');
const bcrypt = require('bcryptjs');
const {validateEmail, validatePassword} = require('../helpers/utils');
const {generateToken} = require('../middleware/auth');
const { Op } = require('sequelize');

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

    const userExists = await User.findOne({
      where: {
        [Op.or]: [{email: email}, {username: username}]
      }
    });
    if (userExists) {
      const message =
        userExists.email === email ? 'Email is already in use!' : 'Username is already taken!';
      res.status(400).send({success: false, message});
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = generateToken(newUser);

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    res.status(201).send({success: true, token, userId: newUser.id});
  } catch (error) {
    console.log('Error trying to register a new user: ', error);
    res
      .status(400)
      .send({success: false, message: 'Something went wrong trying to create a new user'});
  }
};

exports.login = async (req, res) => {
  try {
    const {email, password} = req.body;
    const user = await User.findOne({where: {email}});

    if (!user) {
      return res.status(401).json({success: false, message: 'User not found.'});
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({success: false, message: 'Wrong password.'});
    }

    const token = generateToken(user);

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    res.status(200).json({success: true, token, userId: user.id});
  } catch (error) {
    console.log('Error trying to login the user: ', error);
    res.status(500).json({success: false, message: 'Something went wrong trying to login'});
  }
};

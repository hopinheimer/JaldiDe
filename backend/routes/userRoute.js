import express from 'express';
import User from '../models/userModel.js';
import { getTokenUser } from '../auth/User_util.js';

import bcrypt from 'bcrypt';

const router = express.Router();

// @route    POST api/user/signin
// @desc     User Signin
// @access   Private
router.post('/signin', async (req, res) => {
  try {
    const signinUser = await User.findOne({
      email: req.body.email,
    });

    if (!signinUser) {
      return res
        .status(500)
        .json({ errors: [{ msg: 'user does not exists' }] });
    }

    const isMatch = await bcrypt.compare(
      req.body.password,
      signinUser.password
    );

    if (!isMatch) {
      return res.status(500).json({ errors: [{ msg: 'invalid credentials' }] });
    }

    res.send({
      _id: signinUser.id,
      name: signinUser.name,
      email: signinUser.email,
      token: getTokenUser(signinUser),
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('server error');
  }
});

// @route    POST api/user/register
// @desc     User Register
// @access   Private
router.post('/register', async (req, res) => {
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(req.body.password, salt);

    const newUser = await user.save();
    if (newUser) {
      res.send({
        _id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        token: getTokenUser(newUser),
      });
    } else {
      res.status(401).send({ msg: 'Invalid User Data.' });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send('server error');
  }
});

export default router;

import express from 'express';
import { getTokenSeller } from '../auth/Seller_util.js';
// import { getTokenUser } from '../auth/User_util.js';
import Seller from '../models/sellerModel.js';
import bcrypt from 'bcrypt';
const router = express.Router();

// @route    POST api/seller/signin
// @desc     Seller Sign In
// @access   Private
router.post('/signin', async (req, res) => {
  try {
    const signinSeller = await Seller.findOne({
      email: req.body.email,
    });

    if (!signinSeller) {
      return res
        .status(500)
        .json({ errors: [{ msg: 'user does not exists' }] });
    }

    const isMatch = await bcrypt.compare(
      req.body.password,
      signinSeller.password
    );

    if (!isMatch) {
      return res.status(500).json({ errors: [{ msg: 'invalid credentials' }] });
    }

    res.send({
      _id: signinSeller.id,
      name: signinSeller.name,
      email: signinSeller.email,
      isAdmin: signinSeller.isAdmin,
      token: getTokenSeller(signinSeller),
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('server error');
  }
});

// @route    POST api/seller/register
// @desc     Seller Register
// @access   Private
router.post('/register', async (req, res) => {
  try {
    const seller = new Seller({
      name: req.body.name,
      email: req.body.email,

      sphone: req.body.sphone,
    });
    const salt = await bcrypt.genSalt(10);

    seller.password = await bcrypt.hash(req.body.password, salt);

    const newSeller = await seller.save();
    if (newSeller) {
      res.send({
        _id: newSeller.id,
        name: newSeller.name,
        email: newSeller.email,
        sphone: newSeller.sphone,
        isAdmin: newSeller.isAdmin,
        token: getTokenSeller(newSeller),
      });
    } else {
      res.status(401).send({ msg: 'Invalid Seller Data.' });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send('server error');
  }
});

// @route    POST api/seller/:id
// @desc     Seller phone number
// @access   Private

router.get('/:id', async (req, res) => {
  try {
    const seller = await Seller.findById(req.params.id);
    res.send({ sphone: seller.sphone });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('server error');
  }
});

export default router;

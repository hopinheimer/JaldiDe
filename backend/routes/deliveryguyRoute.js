import express from 'express';
// import { getTokenSeller } from '../auth/Seller_util.js';
// import { getTokenUser } from '../auth/User_util.js';
import Order from '../models/orderModel.js';
import deliveryGuy from '../models/deliveryguyModel.js';

const router = express.Router();

// @route    POST api/delivery/signin
// @desc     Seller Sign In
// @access   Private
router.post('/signin', async (req, res) => {
  try {
    const signinDeliveryGuy = await deliveryGuy.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    if (signinDeliveryGuy) {
      res.send({
        _id: signinDeliveryGuy.id,
        name: signinDeliveryGuy.name,
        email: signinDeliveryGuy.email,
      });
    } else {
      res.status(401).send({ msg: 'Invalid Email or Password.' });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send('server error');
  }
});

// @route    POST api/delivery/register
// @desc     Seller Register
// @access   Private
router.post('/register', async (req, res) => {
  try {
    const delivery = new deliveryGuy({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      contactno: req.body.contactno,
    });
    const newDelivery = await delivery.save();
    if (newDelivery) {
      res.send({
        _id: newDelivery.id,
      });
    } else {
      res.status(401).send({ msg: 'Invalid Seller Data.' });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send('server error');
  }
});

// @route    GET api/delivery/currentorders
// @desc     gives all the orders for the delivery guy which is not delivered
// @access   Private
router.get('/currentorders', async (req, res) => {
  try {
    const order = await Order.find({
      deliveryStatus: false,
    });
    res.send(order);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/delivery/
// @desc     gives all the orders
// @access   Private
router.get('/allorders', async (req, res) => {
  try {
    const orders = await Order.find({});
    res.send(orders);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/status/:order_id
// @desc     gives all the orders
// @access   Private
router.get('/status/:id', async (req, res) => {
  try {
    const orders = await Order.findById(req.params.id);
    orders.deliveryStatus = true;

    await orders.save();
    console.log(orders);
    res.send('Order is Delivered!');
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/delivery/order/:orderid 
// @desc     gives the detail of the particular order
// @access   Private
router.get('/order/:orderid', async (req, res) => {
  try {
    const order = await Order.findOne({_id: req.params.orderid});
    res.send(order) ;
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

export default router;

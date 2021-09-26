import express from 'express';
import Shop from '../models/shopModel.js';
import Order from '../models/orderModel.js';
import { isAuth } from '../middleware/jwtauth.js';

const router = express.Router();

// @route    POST api/orders
// @desc     Create an order
// @access   Private
// isAuth commented out as it is giving error
router.post('/', isAuth, async (req, res) => {
  try {
    console.log(req.body);

    const order = new Order({
      cartItems: req.body.orderItems,
      shipping: req.body.shipping,
      total: req.body.itemPrice,
      user: req.headers.user,
    });
    const newOrder = await order.save();
    if (newOrder) {
      res.send(newOrder);
    } else {
      res.status(401).send({ msg: 'Invalid Seller Data.' });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/orders/:seller_id
// @desc     show orders on the DashBoard
// @access   Private
router.get('/:id', async (req, res) => {
  try {
    const shop = await Shop.findOne({
      seller_id: req.params.id,
    });

    const orders = await Order.find({
      'cartItems.shop_id': shop._id,
    });

    res.send(orders);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
}); 

// @route    GET api/orders/:seller_id/:order_id
// @desc     show order details(productItems)
// @access   Private
router.get('/:id/:order_id', async (req, res) => {
  try {
    const shop = await Shop.findOne({
      seller_id: req.params.id,
    });

    const order = await Order.find({
      'cartItems.shop_id': shop._id,
    }).find({ _id: req.params.order_id });

    order[0].cartItems = order[0].cartItems.filter(
      (item) => item.shop_id.toString() === shop._id.toString()
    );
    const orderResponse = order[0];
    res.send(orderResponse);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
}); 

export default router;

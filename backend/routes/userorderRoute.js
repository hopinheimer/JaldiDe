//THIS ROUTE IS NOT CURRENTLY USED [JUST FOR REFERENCE]

import express from 'express';
import Shop from '../models/shopModel.js';
import Order from '../models/orderModel.js';
import { isAuth } from '../middleware/jwtauth.js';

const router = express.Router();

// @route    GET /api/userorder/order_id
// @desc     Get the order details of a user Order
// @access   Private
router.get('/:order_id', async (req, res) => {

    try {
      const order = await Order.findOne({
        _id: req.params.order_id,
      });
  
      res.send(order);
      console.log(order);
      
    } catch (error) {
      console.error(error.message);
      res.status(500).send('User Order not found');
    }

  });

  export default router;
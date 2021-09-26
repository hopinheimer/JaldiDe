import express from 'express';
import Shop from '../models/shopModel.js';

import { isAuth } from '../middleware/jwtauth.js';

const router = express.Router();

// @route    GET api/shops
// @desc     give all the listed shops + search query
// @access   Private
router.get('/', async (req, res) => {
  const searchKeyword = req.query.searchKeyword
    ? {
        name: {
          $regex: req.query.searchKeyword,
          $options: 'i',
        },
      }
    : {};
  const shops = await Shop.find({ ...searchKeyword });
  res.send(shops);
});

// @route    GET api/shop/:id
// @desc     Details fetch based on shop ID
// @access   Private
router.get('/:id', async (req, res) => {
  try {
    const shopID = req.params.id;
    const shop = await Shop.findOne({ _id: shopID });

    if (shop) res.send(shop);
    else res.status(404).send({ msg: 'Shop not found! ' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('server error');
  }
});

// @route    POST api/shop/create/:id
// @desc     Create Shop
// @access   Private
router.post('/create/:id', async (req, res) => {
  try {
    const shop = new Shop({
      seller_id: req.params.id,
      name: req.body.name,
      description: req.body.desc,
      image: req.body.image,
      address1: req.body.address1,
      address2: req.body.address2,
      area: req.body.area,
    });
    shop.category.push(req.body.category);

    const newShop = await shop.save();
    if (newShop) {
      return res
        .status(201)
        .send({ message: 'New Product Created', data: newShop });
    }
    return res.status(500).send({ message: ' Error in Creating Product.' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('server error');
  }
});

// @route    POST api/shop/addproducts/:id
// @desc     add products to the shopID
// @access   Private
// isAuth JWT ERROR
router.post('/addproducts/:id', async (req, res) => {
  try {
    const shop = await Shop.findOne({
      seller_id: req.params.id,
    });
    if (shop) {
      shop.productItems.push({
        pname: req.body.pname,
        pdesc: req.body.pdesc,
        pprice: req.body.pprice,
        image: req.body.image,
        pcategory: req.body.pcategory,
      });
      shop.save();
      res.send(shop);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).status('server error');
  }
});

// @route    PUT api/shop/addproducts/:id/:productid
// @desc     update the existing product details in shopID
// @access   Private
router.put('/addproducts/:id/:productid', isAuth, async (req, res) => {
  try {
    await Shop.updateOne(
      { 'productItems._id': req.params.productid },
      {
        $set: {
          'productItems.$.pname': req.body.pname,
          'productItems.$.pdesc': req.body.pdesc,
          'productItems.$.pprice': req.body.pprice,
          'productItems.$.image': req.body.image,
        },
      }
    ).then(res.send('Success in Updating Product'));
  } catch (error) {
    console.error(error.message);
    res.status(500).send('server error');
  }
});

// @route    DELETE api/shop/deleteproducts/:id/:productid
// @desc     delete a product from the shopID
// @access   Private
router.delete('/deleteproducts/:id/:productid', isAuth, async (req, res) => {
  try {
    const shop = await Shop.findOne({ seller_id: req.params.id });
    if (shop) {
      const prod = await shop.productItems.find(
        (productItems) => productItems.id === req.params.productid
      );

      shop.productItems = shop.productItems.filter(
        ({ id }) => id !== req.params.productid
      );
      await shop.save();
    }
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

export default router;

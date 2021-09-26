import express from 'express';
import dotenv from 'dotenv';
import userRoute from './routes/userRoute.js';
import sellerRoute from './routes/sellerRoute.js';
import bodyParser from 'body-parser';
import mongoConnect from './databaseConfig/mongodb.js';
import uploadRoute from './routes/uploadRoute.js';
import orderRoute from './routes/orderRoute.js';
import shopRoute from './routes/shopRoute.js';
import userorderRoute from './routes/userorderRoute.js';
import compression from 'compression';
import deliveryguyRoute from './routes/deliveryguyRoute.js';
import sslRedirect from 'heroku-ssl-redirect';

try {
  dotenv.config();
  const path = require('path');

  mongoConnect();

  const app = express();

  //Heroku redirect http to https
  app.use(sslRedirect());

  app.use(compression());
  app.use(bodyParser.json());
  app.use('/api/users', userRoute);
  app.use('/api/seller', sellerRoute);
  app.use('/api/orders', orderRoute);
  app.use('/api/shops', shopRoute);
  app.use('/api/userorder', userorderRoute);
  app.use('/addproducts/api/upload', uploadRoute);
  app.use('/createshop/api/upload', uploadRoute);
  app.use('/api/delivery', deliveryguyRoute);

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname + '/../frontend/build/index.html'));
    });
  }

  app.listen(process.env.PORT || 5000, () =>
    console.log('Server started at port' + process.env.port)
  );
} catch (error) {
  console.error(error.message);
  process.exit(1);
}

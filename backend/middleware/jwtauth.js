import jwt from 'jsonwebtoken';
import config from '../config.js';

const isAuth = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    const onlyToken = token.slice(6, token.length);
    jwt.verify(onlyToken, config.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).send({ message: 'Invalid Token' });
      }
      req.user = decode;
      next();
      return;
    });
  } else {
    return res.status(401).send({ message: 'Token is not supplied.' });
  }
};

const isAdmin = (req, res, next) => {
  console.log(req.user);
  if (req.seller.isAdmin && req.seller) {
    return next();
  }
  return res.status(401).send({ message: 'Admin Token is not valid.' });
};

export { isAuth, isAdmin };

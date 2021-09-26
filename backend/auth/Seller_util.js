import jwt from 'jsonwebtoken';
import config from '../config.js';

const getTokenSeller = (seller) => {
  return jwt.sign(
    {
      _id: seller._id,
      name: seller.name,
      email: seller.email,
      isAdmin: seller.isAdmin,
    },
    config.JWT_SECRET,
    {
      expiresIn: '48h',
    }
  );
};

export { getTokenSeller };

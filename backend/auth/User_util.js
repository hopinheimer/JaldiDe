import jwt from 'jsonwebtoken';
import config from '../config.js';

const getTokenUser = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
    config.JWT_SECRET,
    {
      expiresIn: '48h',
    }
  );
};

export { getTokenUser };

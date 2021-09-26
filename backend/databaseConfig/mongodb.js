import dotenv from 'dotenv';
import config from '../config.js';
import mongoose from 'mongoose';

dotenv.config();

const mongodbUrl = config.MONGODB_URL;

const mongoConnect = async () => {
  try {
    mongoose.connect(
      mongodbUrl,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      },
      console.log('MongoDB connected....')
    );
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

export default mongoConnect;

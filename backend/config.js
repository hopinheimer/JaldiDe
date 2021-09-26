import dotenv from 'dotenv';

dotenv.config();

export default {
  MONGODB_URL:
    'mongodb+srv://brotherlymite:pandey@cluster0.bjrdd.mongodb.net/JaldiDe?retryWrites=true&w=majority',
  JWT_SECRET: process.env.JWT_SECRET || 'secretkey',
  accessKeyId: process.env.accessKeyId || 'accessKeyId',
  secretAccessKey: process.env.secretAccessKey || 'secretAccessKey',
};
import express from 'express';
import multer from 'multer';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';
import config from '../config.js';
const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}.jpg`);
  },
});

const upload = multer({ storage });

// @route    POST api/seller/register
// @desc     Seller Register
// @access   Private

router.post('/', upload.single('image'), (req, res) => {
  try {
    res.send(`/${req.file.path}`);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('server error');
  }
});

aws.config.update({
  accessKeyId: config.accessKeyId,
  secretAccessKey: config.secretAccessKey,
});

const s3 = new aws.S3();
const storageS3 = multerS3({
  s3,
  bucket: 's3-jaldide',
  acl: 'public-read',
  contentType: multerS3.AUTO_CONTENT_TYPE,
  key(req, file, cb) {
    cb(null, file.originalname);
  },
});

const uploadS3 = multer({ storage: storageS3 });

// @route    POST api/seller/register
// @desc     Seller Register
// @access   Private
router.post('/s3', uploadS3.single('image'), (req, res) => {
  try {
    res.send(req.file.location);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('server error');
  }
});

export default router;

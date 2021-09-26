import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveShop, listShops } from '../actions/shopActions';
import Axios from 'axios';
import TextField from '@material-ui/core/TextField';
import SellerSteps from '../components/SellerSteps.js';
import IconButton from "@material-ui/core/IconButton";
import { Camera } from 'grommet-icons';
import { makeStyles, CircularProgress } from '@material-ui/core';
import { Box } from "grommet/components/Box";

const useStyles = makeStyles((theme) => ({
  root: {
    // "& > *": {
    //   margin: theme.spacing(1)
    // }
  },
  input: {
    display: "none"
  }
}));

export default function Sellerinventorypage(props) {

  const classes = useStyles();
  let sellerid = props.match.params.id;

  const id = props.match.params.id;
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [area, setArea] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [Uploading, setUploading] = useState('');

  const UploadFileHandler = (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('image', file);
    setUploading(true);
    Axios.post('api/upload/s3', bodyFormData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        setImage(response.data);
        setUploading(false);
      })
      .catch((err) => {
        console.log(err);
        setUploading(false);
      });
  };
  const shopSave = useSelector((state) => state.shopSave);
  const {
    loading: loadingSave,
    success: successSave,
    error: errorSave,
  } = shopSave;

  //This is to fetch all the shops
  const shopList = useSelector((state) => state.shopList);
  const { shops, loading } = shopList;

  let object;
  if (!loading) {
    let selleridstring = '' + sellerid;
    object = shops.find((x) => x.seller_id === selleridstring);
  }
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listShops());
    if (successSave) {
      props.history.push('/addproducts/' + id);
    }
    //to check if shop already exsist if so redirect
    if (object) {
      if (object._id) {
        console.log(object._id);
        props.history.push('/addproducts/' + id);
      }
    }
    return () => {
      //
    };
  }, [successSave,object]);


  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShop({
        _id: id,
        name,
        desc,
        category,
        image,
        address1,
        address2,
        area,
      })
    );
  };

  return (
    <div>
      <SellerSteps step1 step2/>
    <div>
      <div className='form'>
        <form onSubmit={submitHandler}>
          <ul className='form-container'>
            <li>
              <h3>Create your Online Shop</h3>
            </li>
            <li>
              {loadingSave && <div>
                {/* Loading */}
                <div style={{padding:'80px'}}>
                <CircularProgress color='primary' style={{display: "block", margin:"auto"}} size={40}/>
                </div>
              </div>}
              {errorSave && <div>{errorSave}</div>}
            </li>

            <li>
              <label htmlFor='name'>Shop Name</label>
              <TextField
                required
                type='text'
                id='name'
                name='name'
                onChange={(e) => setName(e.target.value)}
                label='Shop Name'
                defaultValue=''
                variant='outlined'
              />
            </li>

            <li>
            <label htmlFor='name'>Shop Description</label>
              <TextField
                required
                name='description'
                value={desc}
                id='desc'
                onChange={(e) => setDesc(e.target.value)}
                label='Shop Description (2 Line)'
                defaultValue=''
                variant='outlined'
              />
            </li>

            <li>
            <label htmlFor='name'>Shop Address</label>
            <Box direction="column" gap="small">
              <TextField
                required
                name='address1'
                value={address1}
                id='address1'
                onChange={(e) => setAddress1(e.target.value)}
                label='Address Line 1'
                defaultValue=''
                variant='outlined'
              />
              <TextField
                required
                name='address2'
                value={address2}
                id='address2'
                onChange={(e) => setAddress2(e.target.value)}
                label='Address Line 2'
                defaultValue=''
                variant='outlined'
              />
              <TextField
                required
                name='area'
                value={area}
                id='area'
                onChange={(e) => setArea(e.target.value)}
                label='Area'
                defaultValue=''
                variant='outlined'
              />
              </Box>
            </li>

            <li>
              <li>
              <label htmlFor='name'>Shop Image</label>
              <Box direction="row">
                <TextField
                required
                type='text'
                name='image'
                value={image}
                id='image'
                disabled
                onChange={(e) => setImage(e.target.value)}
                label='Upload Shop Front Image'
                defaultValue=''
                variant='outlined'
                />
                  <div className={classes.root}>
                    <input
                      accept="image/*"
                      onChange={UploadFileHandler}
                      className={classes.input}
                      id="icon-button-file"
                      type="file"
                    />
                    {Uploading && <div>Uploading...</div>}
                    <label htmlFor="icon-button-file">
                      <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="span"
                      >
                        <Camera size="medium"/>
                      </IconButton>
                    </label>
                  </div>
                </Box>
              </li>

              <li>
                <label htmlFor='name'>Category</label>
                <TextField
                required
                type='text'
                name='category'
                value={category}
                id='category'
                onChange={(e) => setCategory(e.target.value)}
                label='Shop Category'
                defaultValue=''
                variant='outlined'
              />
              </li>

              <button type='submit' className='button primary'>
                Create Shop
              </button>
            </li>
          </ul>
        </form>
      </div>
    </div>
    </div>
  );
  
}

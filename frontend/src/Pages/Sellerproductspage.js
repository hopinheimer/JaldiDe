import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveProduct, listShops, deleteProduct } from '../actions/shopActions';
import Axios from 'axios';
import { makeStyles, withStyles, Tooltip, CircularProgress } from '@material-ui/core';
import { Box } from "grommet/components/Box";
import IconButton from "@material-ui/core/IconButton";
import TextField from '@material-ui/core/TextField';
import { Camera } from 'grommet-icons';

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import DeleteIcon from '@material-ui/icons/Delete';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import { Heading } from 'grommet';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover
    }
  }
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 700
  },
  input: {
    display: "none"
  }
}));

export default function Sellerproductspage(props) {

  const classes = useStyles();
  let sellerid = props.match.params.id;

  const [modalVisible, setModalVisible] = useState(false);
  const [pname, setPName] = useState('');
  const [pdesc, setPDesc] = useState('');
  const [pcategory, setCategory] = useState('');
  const [pprice, setPPrice] = useState('');
  const [p_id, setId] = useState('');
  const [image, setImage] = useState('');
  const [Uploading, setUploading] = useState(false);

  const productSave = useSelector((state) => state.productSave);
  const {
    loading: loadingSave,
    success: successSave,
    error: errorSave,
  } = productSave;

  const shopList = useSelector((state) => state.shopList);
  const { shops, loading } = shopList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listShops());
    if (successSave) {
      //props.history.push("/addproducts/"+id);
      setModalVisible(false);
    }
    return () => {
      //
    };
  }, [successSave]);

  const openModal = (product) => {
    setModalVisible(true);
    setId(product._id);
    setPName(product.pname);
    setPDesc(product.pdesc);
    setPPrice(product.pprice);
    setImage(product.image);
    setCategory(product.pcategory);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveProduct({
        _id: sellerid,
        pname,
        pdesc,
        pprice,
        pcategory,
        product_id: p_id,
        image,
      })
    );
  };

  //getting the particular productItems from the whole shop object via Seller_id
  let products;
  if (!loading) {
    let selleridstring = '' + sellerid;
    let object = shops.find((x) => x.seller_id === selleridstring);
    if (object) {
      products = object.productItems;
    }
  }

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

  const deleteHandler = (product) => {
    dispatch(deleteProduct({ prod_id: product._id, sel_id: sellerid }));
  };

  return (
    <div className='content content-margined'>
      <Box
      responsive="true"
      pad="small">
      <Heading margin="none" alignSelf="center" pad="small">Manage Shop Inventory</Heading>
      </Box>

      <div style={{padding:12}}>
      <Fab variant="extended" onClick={()=>openModal({})}>
        <AddIcon className={classes.extendedIcon} />
        Add Products
      </Fab>
      </div>

      {/* FORM START */}
      {modalVisible && (
        <div className='form'>
          <form onSubmit={submitHandler}>
            <ul className='form-container'>
              <li>
                <h2>Add Products/Items</h2>
              </li>
              <li>
                {loadingSave && <div>Loading...</div>}
                {errorSave && <div>{errorSave}</div>}
              </li>

              <li>
                <label htmlFor='name'>Product Name</label>
                <input
                  type='text'
                  name='pname'
                  value={pname}
                  id='pname'
                  onChange={(e) => setPName(e.target.value)}
                ></input>
              </li>

              <li>
                <label htmlFor='description'>Product Description</label>
                <input
                  name='description'
                  value={pdesc}
                  id='pdesc'
                  onChange={(e) => setPDesc(e.target.value)}
                ></input>
              </li>

              <li>
                <label htmlFor='description'>Product Category</label>
                <input
                  name='pcategory'
                  value={pcategory}
                  id='pcategory'
                  onChange={(e) => setCategory(e.target.value)}
                ></input>
              </li>

              <li>
              <label htmlFor='image'>Product Image</label>
              <Box direction="row">
                <TextField
                required
                type='text'
                name='image'
                value={image}
                id='image'
                disabled
                onChange={(e) => setImage(e.target.value)}
                label='Upload Product Image'
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
                <li>
                  <label htmlFor='name'>Product Price</label>
                  <input
                    type='text'
                    name='price'
                    value={pprice}
                    id='pprice'
                    onChange={(e) => setPPrice(e.target.value)}
                  ></input>
                </li>

                <button type='submit' className='button primary'>
                  Create Product
                </button>
              </li>
              <li>
                <button
                  type='button'
                  onClick={() => setModalVisible(false)}
                  className='button secondary'
                >
                  Back
                </button>
              </li>
            </ul>
          </form>
        </div>
      )}
      {/* FORM END */}

      {products ? (
        <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Product ID</StyledTableCell>
              <StyledTableCell align="center">Product Name</StyledTableCell>
              <StyledTableCell align="center">Price</StyledTableCell>
              <StyledTableCell align="center">Description</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <StyledTableRow key={product._id}>
                <StyledTableCell component="th" scope="row">
                  {product._id}
                </StyledTableCell>
                <StyledTableCell align="center">{product.pname}</StyledTableCell>
                <StyledTableCell align="center">{product.pprice}</StyledTableCell>
                <StyledTableCell align="center">{product.pdesc}</StyledTableCell>
                <StyledTableCell align="center">

                  <Box direction="row" gap="small" justify="center">
                    <Tooltip title="Edit" onClick={() => openModal(product)}>
                      <Fab size="small" color="secondary" aria-label="edit">
                      <EditIcon />
                      </Fab>
                    </Tooltip>
                    <Tooltip title="Delete" onClick={() => deleteHandler(product)}>
                      <Fab size="small" color="secondary">
                        <DeleteIcon />
                      </Fab>
                    </Tooltip>
                  </Box>

                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      ) : (
        <div>
          {/* Loading */}
          <div style={{padding:'80px'}}>
            <CircularProgress color='primary' style={{display: "block", margin:"auto"}} size={40}/>
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useEffect } from 'react';
import Products from '../components/Products.js';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/shopActions';
import { Heading, Paragraph } from 'grommet';
import { Box } from 'grommet/components/Box';
import { CircularProgress } from '@material-ui/core';

import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  }
}));

export default function Shoppage(props) {
  const productList = useSelector((state) => state.productList);
  const { products, loading } = productList;
  const dispatch = useDispatch();
  let data = products;
  var pcategory = new Set();

  const classes = useStyles();
  const [category, setCategory] = React.useState("All");
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    setCategory(event.target.value);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  
  useEffect(() => {
    dispatch(listProducts(props.match.params.id));
    return () => {
      //
    };
  }, [category]);

  function funct(x){
    if(category !== "All")
    {
      return x.pcategory === category;
    }
    if(category === "All")
    {
      return x.pcategory === x.pcategory;
    }
    else{
      return x.pcategory === x.pcategory;
    }
  }

  products ? products.productItems ? pcategory.add(products.productItems.map(x => (x.pcategory))) : console.log(loading) : console.log(loading);
  var cat = [...pcategory];
  cat = [...new Set(cat[0])];
  console.log(cat);
  products ? products.productItems ? data = products.productItems.filter((x) => funct(x)) : console.log(loading) : console.log(loading);

  return loading ? (
    <div>
      {/* Loading */}
      <div style={{ padding: '80px' }}>
        <CircularProgress
          color='primary'
          style={{ display: 'block', margin: 'auto' }}
          size={40}
        />
      </div>
    </div>
  ) : (
    <div>
      <div
        style={{
          paddingLeft: 50,
          paddingRight: 50,
          paddingTop: 20,
          paddingBottom: 10,
        }}
      >
        <Box
          round='medium'
          responsive='true'
          direction='column'
          // border={{ color: 'brand', size: 'large' }}
          pad='small'
        >
          <Heading margin='none' alignSelf='center' pad='small'>
            {products.name}
          </Heading>
          <Paragraph margin='none' alignSelf='center'>
            {products.description}
          </Paragraph>
        </Box>
      </div>

      {/* Category Dropdown */}
      <div style={{padding:"10",display: "flex" ,justifyContent: "center" ,alignItems: "center"}}>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">Category</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={category}
          onChange={handleChange}
        >
          <MenuItem value="All">
            <em>All</em>
          </MenuItem>
          {cat ? cat.map((x) => <MenuItem value={x} >{x}</MenuItem> ) : <div>Loading..</div>}
        </Select>
      </FormControl>
    
    </div>

      <Products
        data={data}
        id={props.match.params.id}
      ></Products>
    </div>
  );
}

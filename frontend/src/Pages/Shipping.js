import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveShipping } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';
import TextField from '@material-ui/core/TextField';
import { Box } from '@material-ui/core';

export default function Shippingpage(props) {
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('Surat');
  const [area, setArea] = useState('');
  const [phone, setPhone] = useState('');

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShipping({ address1,address2 ,city, area , phone }));
    props.history.push('placeorder');
  };

  return (
    <div style={{ alignContent: 'space-between' }}>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <Box pad="small" responsive="true">
      <div className='form'>
        <form onSubmit={submitHandler}>
          <ul className='form-container'>
            <li>
              <h2>Shipping</h2>
            </li>
            {/* <li>
              {loading && <div>Loading...</div>}
              {error && <div>{error}</div>}
            </li> */}
            <li>
              <TextField
                required
                id='outlined-required'
                label='Address line 1'
                defaultValue=''
                variant='outlined'
                onChange={(e) => setAddress1(e.target.value)}
              />
            </li>

            <li>
              <TextField
                required
                id='outlined-required'
                label='Address line 2'
                defaultValue=''
                variant='outlined'
                onChange={(e) => setAddress2(e.target.value)}
              />
            </li>
            <li>
              <TextField
                required
                id='outlined-required'
                label='Area'
                defaultValue=''
                variant='outlined'
                onChange={(e) => setArea(e.target.value)}
              />
            </li>
            <li>
              <TextField
                disabled
                id='outlined-required'
                label='City: Surat'
                defaultValue='Surat'
                variant='outlined'
                onChange={(e) => setCity(e.target.value)}
              />
            </li>
            <li>
              <TextField
                required
                id='outlined-required'
                label='+91 Phone Number'
                defaultValue=''
                variant='outlined'
                onChange={(e) => setPhone(e.target.value)}
              />
            </li>
            <li>
            <button type='submit' className='button primary'>
              Continue
            </button>
            </li>
          </ul>
        </form>
      </div>
      </Box>
    </div>
  );
}

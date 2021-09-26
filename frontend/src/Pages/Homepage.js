import React, { useEffect, useState } from 'react';
import Shops from '../components/Shops';
import { useSelector, useDispatch } from 'react-redux';
import { listShops } from '../actions/shopActions';
import { FormSearch } from 'grommet-icons';
import { Button, Grommet, TextInput } from 'grommet';
import { Box } from 'grommet/components/Box';
import { CircularProgress } from '@material-ui/core';
import { removeAllFromCart } from '../actions/cartActions';
// import image from '../img/logo2.png';

export default function Homepage(props) {
  const shopList = useSelector((state) => state.shopList);
  const [searchKeyword, setSearchKeyword] = useState('');
  const { shops, loading, error } = shopList;
  const dispatch = useDispatch();
  const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/';

  useEffect(() => {
    dispatch(listShops(searchKeyword));
    return () => {
      //
    };
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(listShops(searchKeyword));
  };
  const ClearCartHandle = () => {
    if (redirect === 'true') {
      dispatch(removeAllFromCart());
      props.history.push('/');
    }
  };
  ClearCartHandle();
  return (
    <div>
      <form onSubmit={submitHandler}>
        <Box
          justify='center'
          direction='row'
          gap='small'
          pad={{ horizontal: '56px', vertical: '30px' }}
        >
          <TextInput
            icon={<FormSearch />}
            size='small'
            placeholder='Shops...'
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
          <Button primary href='/' label='Back' />
        </Box>
      </form>
      {loading ? (
        <div style={{ padding: '80px' }}>
          <CircularProgress
            color='primary'
            style={{ display: 'block', margin: 'auto' }}
            size={40}
          />
        </div>
      ) : error ? (
        { error }
      ) : (
        <Shops shops={shops}></Shops>
      )}
    </div>
  );
}

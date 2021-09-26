import React, { useEffect } from 'react';
import { detailsOrder } from '../actions/deliveryActions';
import { useSelector, useDispatch } from 'react-redux';
import { Box } from 'grommet/components/Box';
import { Heading } from 'grommet';
import Button from '@material-ui/core/Button';
import Axios from 'axios';
import { CircularProgress } from '@material-ui/core';

export default function OrderDeliverydetailspage(props) {
  const deliveryorderDetails = useSelector(
    (state) => state.deliveryorderDetails
  );
  const { order } = deliveryorderDetails;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailsOrder(props.match.params.id));
    return () => {
      //
    };
  }, []);
  console.log(order);

  const buttonHandler = () => {
    Axios.get('/api/delivery/status/' + props.match.params.id);
  };

  return !order ? (
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
      <div>
        <Heading margin='none' alignSelf='center' pad='small'>
          Pick up Items:
        </Heading>
        {!order.cartItems ? (
          <div>loading...</div>
        ) : (
          order.cartItems.map((item) => {
            return (
              <div
                style={{
                  paddingLeft: 2,
                  paddingRight: 2,
                  paddingTop: 15,
                  paddingBottom: 8,
                }}
              >
                <Box
                  border={{ color: 'black', size: 'small' }}
                  round='small'
                  pad='small'
                >
                  {/* Product Name and Image */}
                  <div
                    style={{
                      paddingLeft: 5,
                      paddingRight: 5,
                      paddingTop: 2,
                      paddingBottom: 2,
                    }}
                  >
                    <Box
                      background='light-3'
                      responsive='true'
                      direction='row'
                      round='small'
                      pad='small'
                    >
                      {item.pname}
                      <img
                        alt={item.pname}
                        style={{ margin: '0 auto', maxHeight: '50px' }}
                        src={item.image}
                        className='img-fluid d-block'
                      />
                    </Box>
                  </div>
                  {/* Product Name and Image over*/}

                  {/* Qty and Amount */}
                  <div
                    style={{
                      paddingLeft: 5,
                      paddingRight: 5,
                      paddingTop: 2,
                      paddingBottom: 2,
                    }}
                  >
                    <Box
                      background='light-3'
                      gap='small'
                      responsive='true'
                      direction='row'
                      round='small'
                      pad='small'
                    >
                      Qty:{item.qty} Total: Rs.{item.qty * item.pprice}
                    </Box>
                  </div>
                  {/* Qty and Amount over*/}

                  {/* Shop name and phone num */}
                  <div
                    style={{
                      paddingLeft: 5,
                      paddingRight: 5,
                      paddingTop: 2,
                      paddingBottom: 2,
                    }}
                  >
                    <Box
                      background='light-3'
                      gap='small'
                      responsive='true'
                      direction='row'
                      round='small'
                      pad='small'
                    >
                      Shop name:{item.shop_name}
                    </Box>
                  </div>
                  <div
                    style={{
                      paddingLeft: 5,
                      paddingRight: 5,
                      paddingTop: 2,
                      paddingBottom: 2,
                    }}
                  >
                    <Box
                      background='light-3'
                      gap='small'
                      responsive='true'
                      direction='row'
                      round='small'
                      pad='small'
                    >
                      Shop Phone Number:{item.sphone}
                    </Box>
                  </div>
                  {/* Shop name and phone num over*/}

                  {/* Product Shop address */}
                  <div
                    style={{
                      paddingLeft: 5,
                      paddingRight: 5,
                      paddingTop: 2,
                      paddingBottom: 2,
                    }}
                  >
                    <Box
                      background='light-3'
                      responsive='true'
                      direction='column'
                      round='small'
                      pad='small'
                    >
                      Shop Address: {item.address1} {item.address2} {item.area}
                    </Box>
                  </div>
                  {/* Product Shop address over*/}
                </Box>
              </div>
            );
          })
        )}
      </div>

      {/* Customer Details*/}
      {!order.shipping ? (
        <div>Loading...</div>
      ) : (
        <div
          style={{
            paddingLeft: 5,
            paddingRight: 5,
            paddingTop: 15,
            paddingBottom: 8,
          }}
        >
          <Heading margin='none' alignSelf='center' pad='small'>
            Deliver To:
          </Heading>
          <Box
            direction='column'
            pad='small'
            border={{ color: 'black', size: 'small' }}
            background='light-2'
            round='medium'
          >
            <div>Customer Name: {order.user}</div>
            <div>Customer Number: Left to be done</div>
            <div>
              Customer Address: {order.shipping.address1}{' '}
              {order.shipping.address2} {order.shipping.area}{' '}
              {order.shipping.city}
            </div>
          </Box>
        </div>
      )}
      {/* Customer Details over*/}

      <Box pad='small'>
        <Button
          variant='contained'
          color='primary'
          href={'/delivery'}
          onClick={buttonHandler}
        >
          Mark as Delivered
        </Button>
      </Box>
    </div>
  );
}

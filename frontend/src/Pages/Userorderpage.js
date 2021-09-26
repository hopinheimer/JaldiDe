//THIS PAGE IS NOT CURRENTLY USED [JUST FOR REFERENCE]

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { detailsOrder } from '../actions/orderActions';

export default function Placeorder(props) {

  // const shopID = props.match.params.id;
  // const productID = props.location.search
  //   ? String(props.location.search.split('=')[1])
  //   : 1;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(detailsOrder(props.match.params.id));
    return () => {
    };
  }, []);

  const orderDetails = useSelector(state => state.orderDetails);
  const { loading, order, error } = orderDetails;

  //const itemPrice = cartItems.reduce((total, product) => total + product.pprice*product.qty, 0);

  return (
    <div>
      <div className='placeorder'>
        <div className='placeorder-info'>
          <div>
            <h3>Delivery Address</h3>
            <div style={{ marginTop: '1rem' }}>
              {order.shipping.address},<br></br>
              {order.shipping.city} - {order.shipping.pincode},<br></br>
              {order.shipping.country}
            </div>
          </div>

          <div>
            <ul className='cart-list-container'>
              <li>
                <h3>Shopping Cart</h3>
                <div>
                  <h4>Price</h4>
                </div>
              </li>
              {
                 order.cartItems.map((item) => (
                  <li>
                    <div className='cart-image'>
                      <img src={'item.image'} alt='product' />
                    </div>
                    <div className='cart-name'>
                      <div>
                        <Link to={'/product/' + item.product}>
                          {item.pname}
                        </Link>
                      </div>
                      <div>Qty: {item.qty}</div>
                    </div>
                    <div className='cart-price'>Rs.{item.pprice}</div>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
        <div className='placeorder-action'>
          <ul>
            <li>
              <h3>Order Summary</h3>
            </li>
            <li>
              <div style={{ flexDirection: 'row' }}>
                <div>
                  <h5>Total Price</h5>
                </div>
                <div className='cart-price'>Rs.{order.total}</div>
                
              </div>
            </li>
            <li>
              <h3>Order Successfully Placed</h3>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

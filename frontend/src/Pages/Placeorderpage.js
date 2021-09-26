import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import {
//   addToCart,
//   removeFromCart,
//   removeAllFromCart,
// } from '../actions/cartActions';
import { createOrder } from '../actions/orderActions';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

export default function Placeorder(props) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems, shipping } = cart;

  // if (!shipping) {
  //   props.history.push('shipping');
  // }

  const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));
  const itemPrice = cartItems.reduce(
    (total, product) => total + product.pprice * product.qty,
    0
  );

  const placeOrderHandler = () => {
    // create an order
    dispatch(
      createOrder({
        orderItems: cartItems,
        shipping,
        itemPrice,
      })
    );
    //opens the model after creating order
    setOpen(true);
  };

  // const handleOpen = () => {
  //   setOpen(true);
  // };

  // const clearCartHandler = () => {
  //   dispatch(removeAllFromCart());
  // };
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <div className='placeorder'>
        <div className='placeorder-info'>
          <div>
            <h3>Delivery Address</h3>
            <div style={{ marginTop: '1rem' }}>
              {cart.shipping.address1},<br></br>
              {cart.shipping.address2} - {cart.shipping.area},<br></br>
              {cart.shipping.city}
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
              {cartItems.length === 0 ? (
                <div>Cart is empty</div>
              ) : (
                cartItems.map((item) => (
                  <li>
                    <div className='cart-image' style={{ padding: 10 }}>
                      <img src={item.image} alt='product' />
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
              )}
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
                <div className='cart-price'>Rs.{itemPrice}</div>
                Free shipping {':)'}
              </div>
            </li>
            <li>
              <Button
                variant='contained'
                color='primary'
                className='margin'
                onClick={placeOrderHandler}
              >
                Place Order
              </Button>
              <Modal
                aria-labelledby='transition-modal-title'
                aria-describedby='transition-modal-description'
                className={classes.modal}
                open={open}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <Fade in={open}>
                  <div className={classes.paper}>
                    <h2 id='transition-modal-title'>Order Successfull</h2>
                    <p id='transition-modal-description'>
                      Thank you for choosing us your order will be delivered in
                      2 hours
                    </p>
                    <Button
                      variant='contained'
                      color='primary'
                      className='margin'
                      onClick={(e) => {
                        e.preventDefault();
                        window.location.href = '/?orderplace=true';
                      }}
                    >
                      Back to Homepage
                    </Button>
                  </div>
                </Fade>
              </Modal>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

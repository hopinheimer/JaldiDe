import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { MinusCircleIcon, PlusCircleIcon, TrashIcon } from '../constants/icons';
import { Box } from "grommet/components/Box";
import { Heading } from 'grommet';

export default function Cartpage(props) {

  const [cookie, setCookie] = useState(true);
  const shopID = props.match.params.id;
  const productID = props.location.search
    ? String(props.location.search.split('=')[1])
    : 1;

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const checkoutHandler = () => {
    props.history.push('/user/signin?redirect=shipping');
  };

  const removeFromCartHandler = (productID) => {
    dispatch(removeFromCart(productID));
  };

  useEffect(() => {
    if (productID) {
      dispatch(addToCart(shopID, productID, 1));
    }

    if (navigator.cookieEnabled) {
    setCookie(true);
    } else {
      setCookie(false);
    }

    return () => {
      //
    };
  }, []);


  return (
    <div>
      
      <Box style={{paddingTop:25}}>
      <Heading margin="none" alignSelf="center" color="dark-2" size="small">My Cart</Heading>
      </Box>
      <div className="row no-gutters justify-content-center">
        <div className="col-sm-9 p-3">
            {
              cartItems.length > 0 ?
              //CartProductsComponent
              <div className="card card-body border-0">
                {
                  cartItems.map((product) => (
                    <div style={{padding:10}}>
                    <Box background="light-2" >  
                      <div className="row no-gutters py-2">
                        <div className="col-sm-2 p-2">
                            <img
                            alt={product.pname}
                            style={{margin: "0 auto", maxHeight: "100px"}} 
                            src={product.image} className="img-fluid d-block"/>
                        </div>
                        <div className="col-sm-4 p-2 text-center">
                            <h5 className="mb-1">{product.pname}</h5>
                            <p className="mb-1">Price: Rs. {product.pprice} </p>
                            
                        </div>
                        <div className="col-sm-2 p-2 text-center ">
                          <p className="mb-0">Qty: {product.qty}</p>
                        </div>
                        <div className="col-sm-4 p-2 text-right">
                            <button 
                            onClick={
                              () => {
                              dispatch(addToCart(product.shop_id, product.product, product.qty + 1));
                              }
                            }
                            className="btn btn-primary btn-sm mr-2 mb-1">
                                <PlusCircleIcon width={"20px"}/>
                            </button>

                            {
                              product.qty > 1 &&
                              <button
                              onClick={() => {
                                dispatch(addToCart(product.shop_id, product.product, product.qty - 1));
                                }
                              }
                              className="btn btn-danger btn-sm mb-1">
                                  <MinusCircleIcon width={"20px"}/>
                              </button>
                            }

                            {
                              product.qty === 1 &&
                              <button
                              onClick={() => removeFromCartHandler(product.product)}
                              className="btn btn-danger btn-sm mb-1">
                                  <TrashIcon width={"20px"}/>
                              </button>
                            }
                            
                        </div>
                    </div>
                    </Box>
                    </div>
                  ))
                }
              </div>
              :
              <div className="p-3 text-center text-muted">
                  {cookie ? <div>Your cart is empty</div> : <div>You need to allow Cookies to use the Cart</div>}
              </div>
            }

        </div>
        {
            cartItems.length > 0 && 
            <div className="col-sm-3 p-3">
                <div className="card card-body">
                    <p className="mb-1">Total Items</p>
                    <h4 className=" mb-3 txt-right">{cartItems.reduce((total, product) => total + product.qty, 0)}</h4>
                    <p className="mb-1">Total Amount</p>
                    <h3 className="m-0 txt-right">Rs. {cartItems.reduce((total, product) => total + product.pprice*product.qty, 0)}</h3>
                    <hr className="my-4"/>
                    <div className="text-center">
                        <button type="button" className="btn btn-primary mb-2" onClick={checkoutHandler}>CHECKOUT</button>
                    </div>
                </div>
            </div>
        }               
        </div>
    </div>
  );
}

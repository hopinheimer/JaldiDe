import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsOrder, deleteOrder } from '../actions/orderActions';
import { Box } from "grommet/components/Box";
import { Heading, Paragraph } from 'grommet';
import { CircularProgress } from '@material-ui/core';

export default function OrderInfo(props) {
  const dispatch = useDispatch();
  
  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading: loadingOrders, order, error: errorOrders } = orderDetails;

  useEffect(() => {
    dispatch(detailsOrder(props.match.params.sellerid, props.match.params.id));
    return () => {};
  }, []);

  // const deleteHandler = (order) => {
  //   dispatch(deleteOrder(order._id));
  // };
  console.log(order)

  return loadingOrders ? (
    <div>
      {/* Loading */}
      <div style={{padding:'80px'}}>
        <CircularProgress color='primary' style={{display: "block", margin:"auto"}} size={40}/>
      </div>
    </div>
  ) : 
  ( <div>
    <Box
      round="medium"
      responsive="true"
      direction="column"
      // border={{ color: 'brand', size: 'large' }}
      pad="small">
      <Heading margin="none" alignSelf="center" pad="small">Order Details :</Heading>
      <Paragraph margin="none" alignSelf="center">Order Id: {order._id} </Paragraph>
    </Box>
    <div className="row no-gutters justify-content-center">
      <div className="col-sm-8 p-3">
        { order.cartItems &&
          <div className="card card-body border-0">
          {
            order.cartItems.map((product) => (
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
                </div>
              </Box>
              </div>
            ))
          }
          </div>
        } 
        </div>
        {
            order.cartItems && 
            <div className="col-sm-4 p-3">
                <div className="card card-body">
                    <p className="mb-1">Customer: {order.user} </p>
                    <hr className="my-4"/>
                    <p className="mb-1">
                      {new Date(order.time).toDateString()}  {new Date(order.time).toLocaleTimeString({},
                      {hour12:true,hour:'numeric',minute:'numeric'})}
                    </p>
                    <hr className="my-4"/>
                    <p className="mb-1">Total Items</p>
                    <h4 className=" mb-3 txt-right">{order.cartItems.reduce((total, product) => total + product.qty, 0)}</h4>
                    <p className="mb-1">Total Amount</p>
                    <h3 className="m-0 txt-right">Rs. {order.cartItems.reduce((total, product) => total + product.pprice*product.qty, 0)}</h3>
                    <hr className="my-4"/>
                    <p className="mb-1 txt-right">Shipping Address: {order.shipping.address1}, {order.shipping.address2}, {order.shipping.area}  </p>

                </div>
            </div>
        }               
        </div>
        </div>        
  );
}

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listMyOrders } from '../actions/orderActions';
// import { Link } from 'react-router-dom';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {
  makeStyles,
  withStyles,
  Tooltip,
  Button,
  CircularProgress,
} from '@material-ui/core';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles(
  () => ({
    table: {
      minWidth: 700,
    },
    input: {
      display: 'none',
    },
  }),
  []
);

export default function OrderManagement(props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const myOrderList = useSelector((state) => state.myOrderList);
  const { loading: loadingOrders, orders, error: errorOrders } = myOrderList;
  const sellerSignin = useSelector((state) => state.sellerSignin);
  const { sellerInfo } = sellerSignin;

  useEffect(() => {
    dispatch(listMyOrders(props.match.params.id));
    return () => {};
  }, []);

  return (
    <div className='profile-orders content-margined'>
      {loadingOrders ? (
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
      ) : errorOrders ? (
        <div>{errorOrders} </div>
      ) : (
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label='customized table'>
            <TableHead>
              <TableRow>
                <StyledTableCell align='center'>Order Details</StyledTableCell>
                <StyledTableCell>Order ID</StyledTableCell>
                <StyledTableCell align='center'>Date</StyledTableCell>
                <StyledTableCell align='center'>Time</StyledTableCell>
                <StyledTableCell align='center'>Customer Name</StyledTableCell>
                <StyledTableCell align='center'>Location</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <StyledTableRow key={order._id}>
                  <StyledTableCell align='center'>
                    <Button
                      variant='contained'
                      color='primary'
                      href={
                        '/seller/orderdetails/' +
                        sellerInfo._id +
                        '/' +
                        order._id
                      }
                    >
                      Order Deatils
                    </Button>
                  </StyledTableCell>
                  <StyledTableCell component='th' scope='row'>
                    {order._id}
                  </StyledTableCell>
                  <StyledTableCell align='center'>
                    {new Date(order.time).toDateString()}
                  </StyledTableCell>
                  <StyledTableCell align='center'>
                    {new Date(order.time).toLocaleTimeString(
                      {},
                      { hour12: true, hour: 'numeric', minute: 'numeric' }
                    )}
                  </StyledTableCell>
                  <StyledTableCell align='center'>{order.user}</StyledTableCell>
                  <StyledTableCell align='center'>
                    {order.shipping.area}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}

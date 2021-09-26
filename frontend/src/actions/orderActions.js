import Axios from 'axios';

import Cookie from 'js-cookie';
import { get } from 'mongoose';

import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  MY_ORDER_LIST_REQUEST,
  MY_ORDER_LIST_SUCCESS,
  MY_ORDER_LIST_FAIL,
  ORDER_DELETE_REQUEST,
  ORDER_DELETE_SUCCESS,
  ORDER_DELETE_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
} from '../constants/orderConstants';

const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
    const {
      userSignin: { userInfo },
    } = getState();
    const {
      data: { data, newOrder },
    } = await Axios.post('/api/orders', order, {
      headers: {
        Authorization: 'Bearer' + userInfo.token,
        user: userInfo.name,
      },
    });

    dispatch({ type: ORDER_CREATE_SUCCESS, payload: newOrder });
  } catch (error) {
    dispatch({ type: ORDER_CREATE_FAIL, error: error.message });
  }
};

const detailsOrder = (sellerId, orderId) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId });
    const {
      sellerSignin: { sellerInfo },
    } = getState();
    const { data } = await Axios.get(
      '/api/orders/' + orderId + '/' + sellerId,
      {
        headers: { Authorization: 'Bearer ' + sellerInfo.token },
      }
    );
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ORDER_DETAILS_FAIL, payload: error.message });
  }
};

const listMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: MY_ORDER_LIST_REQUEST });
    const {
      sellerSignin: { sellerInfo },
    } = getState();

    const { data } = await Axios.get('/api/orders/' + sellerInfo._id);
    dispatch({ type: MY_ORDER_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: MY_ORDER_LIST_FAIL, payload: error.message });
  }
};

const listOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_LIST_REQUEST });
    const {
      userSignin: { sellerInfo },
    } = getState();
    const { data } = await Axios.get('/api/orders', {
      headers: { Authorization: 'Bearer ' + sellerInfo.token },
    });
    dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ORDER_LIST_FAIL, payload: error.message });
  }
};

const deleteOrder = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DELETE_REQUEST, payload: orderId });
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.delete('/api/orders/' + orderId, {
      headers: { Authorization: 'Bearer ' + userInfo.token },
    });
    dispatch({ type: ORDER_DELETE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ORDER_DELETE_FAIL, payload: error.message });
  }
};

export { createOrder, detailsOrder, listMyOrders, listOrders, deleteOrder };

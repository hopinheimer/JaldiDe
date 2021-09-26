import Axios from 'axios';
import Cookie from 'js-cookie';
import {
  SELLER_SIGNIN_REQUEST,
  SELLER_SIGNIN_SUCCESS,
  SELLER_SIGNIN_FAIL,
  SELLER_REGISTER_REQUEST,
  SELLER_REGISTER_SUCCESS,
  SELLER_REGISTER_FAIL,
} from '../constants/sellerConstants';

const signin = (email, password) => async (dispatch) => {
  dispatch({ type: SELLER_SIGNIN_REQUEST, payload: { email, password } });
  try {
    const { data } = await Axios.post('/api/seller/signin', {
      email,
      password,
    });
    dispatch({ type: SELLER_SIGNIN_SUCCESS, payload: data });
    Cookie.set('sellerInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({ type: SELLER_SIGNIN_FAIL, payload: error.message });
  }
};

const register = (name, email, password, rePassword, sphone) => async (
  dispatch
) => {
  dispatch({
    type: SELLER_REGISTER_REQUEST,
    payload: { name, email, password, sphone },
  });
  if (rePassword !== password) {
    dispatch({ type: SELLER_REGISTER_FAIL, payload: "Passwords don't match" });
  }
  try {
    const { data } = await Axios.post('/api/seller/register', {
      name,
      email,
      password,
      sphone,
    });
    dispatch({ type: SELLER_REGISTER_SUCCESS, payload: data });
    Cookie.set('sellerInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({ type: SELLER_REGISTER_FAIL, payload: error.message });
  }
};

export { signin, register };

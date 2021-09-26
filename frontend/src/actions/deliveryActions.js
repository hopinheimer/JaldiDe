import Axios from "axios";
import Cookie from 'js-cookie';
import { DELIVERY_SIGNIN_FAIL, DELIVERY_SIGNIN_SUCCESS, DELIVERY_SIGNIN_REQUEST, CURRENT_ORDER_REQUEST, CURRENT_ORDER_SUCCESS, CURRENT_ORDER_FAIL, DETAILS_ORDER_FAIL, DETAILS_ORDER_SUCCESS, DETAILS_ORDER_REQUEST } from "../constants/deliveryConstants";

const signin = (email, password) => async (dispatch) => 
{
  dispatch({ type: DELIVERY_SIGNIN_REQUEST, payload: { email, password } });
  try 
  {
    const { data } = await Axios.post("/api/delivery/signin", { email, password });
    dispatch({ type: DELIVERY_SIGNIN_SUCCESS, payload: data });
    Cookie.set('deliveryInfo', JSON.stringify(data));
  } 
  catch (error) 
  {
    dispatch({ type: DELIVERY_SIGNIN_FAIL, payload: error.message });
  }
}

const currentOrders = () => async (dispatch ) => {
  try {
    dispatch({ type: CURRENT_ORDER_REQUEST }); 
    const { data } = await Axios.get('/api/delivery/currentorders' );
    dispatch({ type: CURRENT_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CURRENT_ORDER_FAIL, payload: error.message });
  }
};

const detailsOrder = (orderId) => async (dispatch) => {
  try {
    dispatch({ type: DETAILS_ORDER_REQUEST, payload: orderId });
    const { data } = await Axios.get('/api/delivery/order/' + orderId);
    dispatch({ type: DETAILS_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: DETAILS_ORDER_FAIL, payload: error.message });
  }
};

export { signin, currentOrders, detailsOrder };
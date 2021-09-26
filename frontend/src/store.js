import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import {
  shopListReducer,
  productListReducer,
  shopSaveReducer,
  productSaveReducer,
  productDeleteReducer,
} from './reducers/shopReducers';
import thunk from 'redux-thunk';
import { cartReducer } from './reducers/cartReducers';
import Cookie from 'js-cookie';
import {
  userSigninReducer,
  userRegisterReducer,
} from './reducers/userReducers';
import {
  sellerSigninReducer,
  sellerRegisterReducer,
} from './reducers/sellerReducers';
import {
  orderDetailsReducer,
  myOrderListReducer,
  orderListReducer,
  orderDeleteReducer,
} from './reducers/orderReducers';
import { deliverySigninReducer, orderCurrentReducer, orderDetailsDeliReducer } from './reducers/deliveryReducers';

const userInfo = Cookie.getJSON('userInfo') || null;
const sellerInfo = Cookie.getJSON('sellerInfo') || null;
const deliveryInfo = Cookie.getJSON('deliveryInfo' || null);
const cartItems = Cookie.getJSON('cartItems') || [];
const shipping = Cookie.getJSON('shipping') || null;

const initialState = {
  cart: { cartItems, shipping },
  userSignin: { userInfo },
  deliverySignin: { deliveryInfo },
  sellerSignin: { sellerInfo },
};

const reducer = combineReducers({
  shopList: shopListReducer,
  productList: productListReducer,
  cart: cartReducer,
  userSignin: userSigninReducer,
  deliverySignin: deliverySigninReducer,
  userRegister: userRegisterReducer,
  sellerSignin: sellerSigninReducer,
  sellerRegister: sellerRegisterReducer,
  shopSave: shopSaveReducer,
  productSave: productSaveReducer,
  productDelete: productDeleteReducer,
  orderDetails: orderDetailsReducer,
  myOrderList: myOrderListReducer,
  orderList: orderListReducer,
  orderDelete: orderDeleteReducer,

  orderCurrent: orderCurrentReducer,
  deliveryorderDetails: orderDetailsDeliReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);
export default store;

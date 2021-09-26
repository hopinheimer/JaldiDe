import Axios from 'axios';
import {
  ADD_TO_CART,
  CART_REMOVE_ITEM,
  CART_REMOVE_ITEM_ALL,
  CART_SAVE_SHIPPING,
} from '../constants/cartConstants';
import Cookie from 'js-cookie';

const addToCart = (shopID, productID, qty) => async (dispatch, getState) => {
  try {
    const { data } = await Axios.get('/api/shops/' + shopID);
    productID = '' + productID;

    const contact = await Axios.get('/api/seller/' + data.seller_id);

    const object = data.productItems.find((x) => x._id === productID);
    //console.log(object);
    dispatch({
      type: ADD_TO_CART,
      payload: {
        shop_id: shopID,
        shop_name: data.name,
        product: object._id,
        pname: object.pname,
        pprice: object.pprice,
        pdesc: object.pdesc,
        image: object.image,
        address1: data.address1,
        address2: data.address2,
        area: data.area,
        sphone: contact.data.sphone,
        qty,
      },
    });

    const {
      cart: { cartItems },
    } = getState();
    Cookie.set('cartItems', JSON.stringify(cartItems));
  } catch (error) {}
};

const removeFromCart = (shopID) => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: shopID });

  const {
    cart: { cartItems },
  } = getState();
  Cookie.set('cartItems', JSON.stringify(cartItems));
};

const saveShipping = (data) => (dispatch, getState) => {
  dispatch({ type: CART_SAVE_SHIPPING, payload: data });
};

const removeAllFromCart = () => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM_ALL, payload: null });

  const {
    cart: { cartItems },
  } = getState();
  Cookie.set('cartItems', JSON.stringify(cartItems));
};

export { addToCart, removeFromCart, saveShipping, removeAllFromCart };

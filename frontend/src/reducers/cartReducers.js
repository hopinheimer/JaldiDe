import {
  ADD_TO_CART,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING,
  CART_REMOVE_ITEM_ALL,
} from '../constants/cartConstants';

function cartReducer(state = { cartItems: [], shipping: {} }, action) {
  switch (action.type) {
    
    case ADD_TO_CART:
      const item = action.payload;
      const product = state.cartItems.find((x) => x.product === item.product);
      if (product) {
        return {
          cartItems: state.cartItems.map((x) =>
            x.product === product.product ? item : x
          ),
        };
      }
      return { cartItems: [...state.cartItems, item] };

    case CART_REMOVE_ITEM:
      return {
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };

    case CART_REMOVE_ITEM_ALL:
      return {
        cartItems: state.cartItems.filter((x) => x.product === action.payload),
      };

    case CART_SAVE_SHIPPING:
      return { ...state, shipping: action.payload };

    default:
      return state;
    //return {cartItems: [...state.cartItems]};
  }
}

export { cartReducer };

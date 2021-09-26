import { DELIVERY_SIGNIN_REQUEST, DELIVERY_SIGNIN_SUCCESS, DELIVERY_SIGNIN_FAIL, CURRENT_ORDER_REQUEST, CURRENT_ORDER_SUCCESS, CURRENT_ORDER_FAIL, DETAILS_ORDER_FAIL, DETAILS_ORDER_SUCCESS, DETAILS_ORDER_REQUEST } from "../constants/deliveryConstants";

function deliverySigninReducer(state = {}, action) {
    switch (action.type) {
      case DELIVERY_SIGNIN_REQUEST:
        return { loading: true };
      case DELIVERY_SIGNIN_SUCCESS:
        return { loading: false, deliveryInfo: action.payload };
      case DELIVERY_SIGNIN_FAIL:
        return { loading: false, error: action.payload };
      default: return state;
    }
  }

function orderCurrentReducer(
  state = {
    orders: [],
  },
  action
) {
  switch (action.type) {
    case CURRENT_ORDER_REQUEST:
      return { loading: true };
    case CURRENT_ORDER_SUCCESS:
      return { loading: false, orders: action.payload };
    case CURRENT_ORDER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function orderDetailsDeliReducer(
  state = {
    order: {  },
  },
  action
) {
  switch (action.type) {
    case DETAILS_ORDER_REQUEST:
      return { loading: true };
    case DETAILS_ORDER_SUCCESS:
      return { loading: false, order: action.payload };
    case DETAILS_ORDER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export {
    deliverySigninReducer , orderCurrentReducer , orderDetailsDeliReducer
}  
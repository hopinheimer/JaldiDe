import {
  SELLER_SIGNIN_REQUEST,
  SELLER_SIGNIN_SUCCESS,
  SELLER_SIGNIN_FAIL,
  SELLER_REGISTER_REQUEST,
  SELLER_REGISTER_SUCCESS,
  SELLER_REGISTER_FAIL,
} from '../constants/sellerConstants';

function sellerSigninReducer(state = {}, action) {
  switch (action.type) {
    case SELLER_SIGNIN_REQUEST:
      return { loading: true };
    case SELLER_SIGNIN_SUCCESS:
      return { loading: false, sellerInfo: action.payload };
    case SELLER_SIGNIN_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function sellerRegisterReducer(state = {}, action) {
  switch (action.type) {
    case SELLER_REGISTER_REQUEST:
      return { loading: true };
    case SELLER_REGISTER_SUCCESS:
      return { loading: false, sellerInfo: action.payload };
    case SELLER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export { sellerSigninReducer, sellerRegisterReducer };

import { SHOP_LIST_REQUEST, SHOP_LIST_SUCCESS, SHOP_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL, SHOP_SAVE_REQUEST, SHOP_SAVE_SUCCESS, SHOP_SAVE_FAIL, PRODUCT_SAVE_REQUEST, PRODUCT_SAVE_SUCCESS, PRODUCT_SAVE_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL } from "../constants/shopConstants";

function shopListReducer(state = {shops:[]}, action){
    switch (action.type) {
        case SHOP_LIST_REQUEST:
            return { loading:true };
        case SHOP_LIST_SUCCESS:
            return { loading:false, shops: action.payload };
        case SHOP_LIST_FAIL:
            return { loading:false , error: action.payload };
        default:
            return state;
    }
}

function productListReducer(state = {products:[]}, action){
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return { loading:true };
        case PRODUCT_LIST_SUCCESS:
            return { loading:false, products: action.payload };
        case PRODUCT_LIST_FAIL:
            return { loading:false , error: action.payload };
        default:
            return state;
    }
}

function shopSaveReducer(state = { shop: {} }, action) {

    switch (action.type) {
      case SHOP_SAVE_REQUEST:
        return { loading: true };
      case SHOP_SAVE_SUCCESS:
        return { loading: false, success: true, shop: action.payload };
      case SHOP_SAVE_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state;
    }
}

function productSaveReducer(state = { product: {} }, action) {

    switch (action.type) {
      case PRODUCT_SAVE_REQUEST:
        return { loading: true };
      case PRODUCT_SAVE_SUCCESS:
        return { loading: false, success: true, product: action.payload };
      case PRODUCT_SAVE_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state;
    }
}

function productDeleteReducer(state = { product: {} }, action) {

  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: true };
    case PRODUCT_DELETE_SUCCESS:
      return { loading: false, product: action.payload, success: true };
    case PRODUCT_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state;
  }
}


export { shopListReducer , productListReducer, shopSaveReducer, productSaveReducer, productDeleteReducer}
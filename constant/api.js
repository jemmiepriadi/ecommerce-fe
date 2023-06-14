export const BASE_URL = 'http://localhost:8080/';
export const API_V1 = BASE_URL + 'api/'

export const AUTH_URL = API_V1 + 'auth/'
export const LOGIN_URL = AUTH_URL + 'login'
export const REGISTER_URL = AUTH_URL + 'register'
export const ME_URL = API_V1 + 'me'

export const PRODUCT_URL = API_V1 + "products"
export const CREATE_PRODUCT = PRODUCT_URL + '/create'
export const UPDATE_PRODUCT = PRODUCT_URL + '/update'
export const DELETE_PRODUCT = PRODUCT_URL + '/delete'

export const ORDER_URL = API_V1 + "orders"
export const UPDATE_ORDER = ORDER_URL + '/update'

export const CART_URL = API_V1 + "shoppingcart"
export const UPDATE_CART = CART_URL+"/update"
export const DELETE_CART = CART_URL + '/delete'
export const DELETE_PRODUCT_CART = CART_URL + '/productcart/delete'
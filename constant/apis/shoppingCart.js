import axios from "axios";
import { CART_URL, DELETE_CART, DELETE_PRODUCT_CART, UPDATE_CART } from "../api";
import { getCookie } from "cookies-next";

export async function getShoppingCart(params) {
    return axios.get(CART_URL,{params: params})
}

export async function addShoppingCart(data, params) {
    return axios.post(CART_URL, data, { params: params, headers: {'Content-Type': 'application/json',"Authorization" : `${getCookie("auth_token")}`}})
}

export async function updateShoppingCart(data) {
    return axios.put(UPDATE_CART, data)
}

export async function deleteShoppingCart(data) {
    return axios.delete(DELETE_CART, data)
}

export async function deleteProductCart(params) {
    return axios.delete(DELETE_PRODUCT_CART,  { params: params, headers: {"Authorization" : `${getCookie("auth_token")}`} })
}
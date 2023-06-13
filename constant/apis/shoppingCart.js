import axios from "axios";
import { CART_URL, UPDATE_CART } from "../api";
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

import axios from "axios";
import { CART_URL, UPDATE_CART } from "../api";

export async function getShoppingCart(params) {
    return axios.get(CART_URL,{params: params})
}

export async function addShoppingCart(data) {
    return axios.post(CART_URL, data)
}

export async function addShoppingCart(data) {
    return axios.post(UPDATE_CART, data)
}

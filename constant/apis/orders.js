import Axios from "axios";
import { ORDER_URL, UPDATE_ORDER } from "../api";
import { getCookie } from "cookies-next";

export async function getOrders(data) {
    return Axios.get(ORDER_URL, {params: data})
}

export async function addOrder(data) {
    return Axios.post(ORDER_URL, data)
}

export async function updateOrder(data, param){
    return Axios.put(UPDATE_ORDER, data, {params: param, headers: {'Authorization':`${getCookie('auth_token')}`}})
}
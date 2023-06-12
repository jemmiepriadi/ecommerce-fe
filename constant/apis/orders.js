import Axios from "axios";
import { ORDER_URL } from "../api";

export async function getOrders(data) {
    return Axios.get(ORDER_URL, data)
}

export async function addOrder(data) {
    return Axios.post(ORDER_URL, data)
}
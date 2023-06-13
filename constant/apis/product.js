import Axios from "axios";
import { CREATE_PRODUCT, DELETE_PRODUCT, PRODUCT_URL, UPDATE_PRODUCT } from "../api";
import { getCookie } from "cookies-next";

export async function getAll(){
    return Axios.get(PRODUCT_URL)
}

export async function getAllProducts(data){
    let promise =  Axios.get(PRODUCT_URL, {params: data})
    return promise
}

export async function uploadProduct(data){
    let promise =  Axios.post(CREATE_PRODUCT, data, {headers: {"Authorization" : `${getCookie("auth_token")}`}})
    return promise
}

export async function updateProduct(data, params){
    let promise =  Axios.put(UPDATE_PRODUCT, data, {params: params, headers: {"Authorization" : `${getCookie("auth_token")}`}})
    return promise
}

export async function deleteProduct(data){
    let promise =  Axios.delete(DELETE_PRODUCT, {params: data, headers: {"Authorization" : `${getCookie("auth_token")}`}})
    return promise
}

import Axios from "axios";
import { PRODUCT_URL } from "../api";

export async function getAll(){
    return Axios.get(PRODUCT_URL)
}

export async function getAllProducts(data){
    let promise =  Axios.get(PRODUCT_URL, {params: data})
    return promise
}


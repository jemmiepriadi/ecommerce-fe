
import Axios from 'axios'
import { LOGIN_URL, ME_URL } from '../api'


export function login(data){
    return Axios.post(LOGIN_URL, data, {headers: {"Authorization" : `${localStorage.getItem("auth_token")}`}})
}

export function me(){
    return Axios.get(ME_URL)
}

export function getMeByToken(token){
    return Axios.get(ME_URL, {params: token})
}

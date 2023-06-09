
import Axios from 'axios'
import { LOGIN_URL, ME_URL, REGISTER_URL } from '../api'


export function login(data){
    return Axios.post(LOGIN_URL, data)
}

export function register(data){
    return Axios.post(REGISTER_URL, data)
}

export function me(){
    return Axios.get(ME_URL)
}

export function getMeByToken(token){
    return Axios.get(ME_URL, {params: token})
}

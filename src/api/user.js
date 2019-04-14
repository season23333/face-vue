import axios from 'axios'

export function login(username,password) {
    return axios.post('',{username:username,password:password})
}
export function reset(email) {
    return axios.post('',{email:email})}
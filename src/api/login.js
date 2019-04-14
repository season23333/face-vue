import request from '../util/request'
import { stringify } from 'qs'
export function login(phoneNumber,password) {
    return request({
        url: '/user/login',
        method: 'post',
        data: stringify({
            phoneNumber,
            password
        })
    })
}

export function getInfo(token) {
    return request({
        url: '/user/role',
        method: 'get',
        params: { token }
    })
}

export function logout() {
    return request({
        url: '/user/logout',
        method: 'post'
    })
}

export function test() {
    return request({
        url: '/user/test',
        method: 'get'
    })
}

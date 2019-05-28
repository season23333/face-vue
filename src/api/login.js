import request from '../util/request'
// import {stringify} from 'qs'

export function login(phoneNumber, password) {
    return request({
        url: '/user/login',
        method: 'post',
        data: {
            phoneNumber,
            password
        }
        // data: {
        //     phoneNumber: phoneNumber,
        //     password: password
        // }
    })
}

export function getInfo(token) {
    return request({
        url: '/user/role',
        method: 'get',
        params: {token}
    })
}

//测试token用的接口
export function test() {
    return request({
        url: '/user/test',
        method: 'get'
    })
}

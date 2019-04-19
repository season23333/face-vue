import request from '../util/request'
import {stringify} from 'qs'

// export function getInfo(token) {
//     return request({
//         url: '/user/role',
//         method: 'get',
//         params: { token }
//     })
// }

export function getUserID() {
    return request({
        url: '/user/userID',
        method: 'get'
    })
}

export function getDetails(pageCurrent,pageSize) {
    return request({
        url: '/conference/details',
        method: 'get',
        params:{pageCurrent:pageCurrent,pageSize:pageSize}
    })
}

export function validatePeople(realName) {
    return request({
        url: '/user/userList',
        method: 'get',
        params: {realName: realName}
    })
}



// export function reset(email) {
//     return axios.post('', {email: email})
// }
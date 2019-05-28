import request from '../util/request'
// import {stringify} from 'qs'

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

export function getDetails(pageCurrent, pageSize) {
    return request({
        url: '/conference/details',
        method: 'get',
        params: {pageCurrent: pageCurrent, pageSize: pageSize}
    })
}

export function validatePeople(realName) {
    return request({
        url: '/user/userList',
        method: 'get',
        params: {realName: realName}
    })
}

export function register(password, realName, department, email, phoneNumber, userGroup) {
    return request({
        url: '/user/signup',
        method: 'post',
        params: {password:password,realName:realName,department:department,email:email,phoneNumber:phoneNumber,userGroup:userGroup}
    })
}


// export function reset(email) {
//     return axios.post('', {email: email})
// }

export function getUserInfo() {
    return request({
        url:'/user/currentUserInfo',
        method:'get'
    })
}

export function passwordReset(oldPassword,newPassword) {
    return request({
        url:'/user/password',
        method:'post',
        data: {
            oldPassword,
            newPassword
        }
    })
}

export function updateUserInfo(email,phoneNumber) {
    return request({
        url:'/user/currentUserInfo',
        method:'post',
        data:{
            email,
            phoneNumber
        }
    })
}
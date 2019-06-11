import request from '../util/request'

export function getTotalPage() {
    return request({
        url: '/userManage/pageNumber',
        method: 'get',
    })
}

export function getUserList(pageNumber) {
    return request({
        url: '/userManage/allUsers',
        method: 'get',
        params: {pageNumber: pageNumber}
    })
}

export function modifyMobile(userID, phoneNumber) {
    return request({
        url: '/userManage/modifyMobile',
        method: 'post',
        data: {
            userID,
            phoneNumber
        }
    })
}

export function modifyEmail(userID, email) {
    return request({
        url: '/userManage/modifyEmail',
        method: 'post',
        data: {
            userID,
            email
        }
    })
}

export function basicInfo(userID, realName, department) {
    return request({
        url: '/userManage/basicInfo',
        method: 'post',
        data: {
            userID,
            realName,
            department
        }
    })
}

export function getGroup() {
    return request({
        url: '/userManage/userGroup',
        method: 'get',
    })
}

export function modifyPassword(userID, newPassword) {
    return request({
        url: '/userManage/password',
        method: 'post',
        data: {
            userID,
            newPassword
        }
    })
}
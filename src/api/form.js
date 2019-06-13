import request from "../util/request";


export function getFormData() {
    return request({
        url:'/form/users/conference',
        method:'get',
    })
}
export function getPieData() {
    return request({
        url:'/form/user/conference',
        method:'get',
    })
}
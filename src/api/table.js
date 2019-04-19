import request from '../util/request'
import {stringify} from 'qs'

// export function getInfo(token) {
//     return request({
//         url: '/user/role',
//         method: 'get',
//         params: { token }
//     })
// }

export function getMeetingList(date, buildingID, roomID) {
    return request({
        url: '/room/list',
        method: 'get',
        params: {date: date, buildingID: buildingID, roomID: roomID}
    })
}

export function text(a) {
    return axios.get('http://localhost:8082/room/free', {params: {a: a}})
}

export function getDetails(pageNum, pageSize) {
    return axios.get('http://localhost:8082/', {params: {pageNum: pageNum, pageSize: pageSize}})
}

// export function text(a) {
//     return axios.post('http://localhost:8082/room/free',{a:a})
// }

// import request from '../util/request'


//
// export function getMeetingListByDate(date) {
//     return axios.get('/meeting/list/date','get',date)
// }

// export function text() {
//     return request({
//         // url: 'http://172.26.143.115:8080/room/free',
//         url: '/next',
//         method: 'get',
//     })
// }
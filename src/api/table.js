import axios from 'axios'
// import  '../util/mock'

export function text() {
    return axios.get('http://127.0.0.1:8082/room/free','get')
}

// import request from '../util/request'

export function getMeetingList(date) {
    return axios.get('/meeting/list','get',date)
}
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
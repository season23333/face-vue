import axios from 'axios'
// import  '../util/mock'

export function text(a) {
    return axios.get('http://localhost:8082/room/free',{params:{a:a}})
}

// export function text(a) {
//     return axios.post('http://localhost:8082/room/free',{a:a})
// }

// import request from '../util/request'

export function getMeetingList(date) {
    return axios.get('http://127.0.0.1:8082/conference/list?date=2019-03-13%2000:00:00','get',date)
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
import request from '../util/request'
import {stringify} from 'qs'

// export function getInfo(token) {
//     return request({
//         url: '/user/role',
//         method: 'get',
//         params: { token }
//     })
// }

export function getFreeRoom() {
    return request({
        url: '/room/freeRoomNumber',
        method: 'get',
    })
}

export function getAllBuilding() {
    return request({
        url: '/building/allBuilding',
        method: 'get',
    })
}

export function byBuilding(building) {
    return request({
        url: '/room/list/building',
        method: 'get',
        params: {buildingID: building}
    })
}

export function getRoomName(roomID) {
    return request({
        url: '/room/roomObject',
        method: 'get',
        params: {roomID: roomID}
    })
}

export function getBuildingName(buildingID) {
    return request({
        url: '/building/buildingObject',
        method: 'get',
        params: {buildingID: buildingID}
    })
}
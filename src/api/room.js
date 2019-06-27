import request from '../util/request'
// import {stringify} from 'qs'

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

export function getType() {
    return request({
        url: '/room/catalogue',
        method: 'get',
    })
}


//会议室管理接口
export function getAllRoom(pageCurrent, pageSize) {
    return request({
        url: '/room/list/room',
        method: 'get',
        params: {pageCurrent: pageCurrent, pageSize: pageSize}
    })
}

export function matchSearch(params) {
    return request({
        url: '/room/match',
        method: 'get',
        params: {params: params}
    })
}

export function getRoomTotal() {
    return request({
        url: '/room/total',
        method: 'get',
    })
}

export function modifyRoom(building, capacity, catalogue, location, name) {
    return request({
        url: '/room/modify',
        method: 'post',
        data: {
            building,
            capacity,
            catalogue,
            location,
            name
        }
    })
}

export function modifyRoom1(building, capacity, catalogue, location, name, flag, roomID) {
    return request({
        url: '/room/modify',
        method: 'post',
        data: {
            building,
            capacity,
            catalogue,
            location,
            name,
            flag,
            roomID
        }
    })
}

export function deleteRoom(roomID) {
    return request({
        url: '/room/delete',
        method: 'post',
        data: {
            roomID
        }
    })
}

export function searchPage(params, pageCurrent, pageSize) {
    return request({
        url: 'room/match/page',
        method: 'get',
        params: {params: params, pageCurrent: pageCurrent, pageSize: pageSize}
    })
}

export function getIntelligence() {
    return request({
        url: 'room/intelligence',
        method: 'get',
    })
}

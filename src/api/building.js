import request from '../util/request'

export function getBuildingByAddress(address) {
    return request({
        url: '/building/list/id',
        method: 'get',
        params: {address: address}
    })
}

export function getAddressByBuildingID(buildingID) {
    return request({
        url: '/building/list/address',
        method: 'get',
        params: {buildingID: buildingID}
    })
}
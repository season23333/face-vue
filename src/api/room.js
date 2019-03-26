import axios from 'axios'

export function getFreeRoom() {
    return axios.get('http://localhost:8082/room/free')
}
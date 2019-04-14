import Vue from 'vue'
import Vuex from 'vuex'
import { login, logout, getInfo } from './api/login'
import { getToken, setToken, removeToken } from './util/auth'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        token: getToken(),
        name: '',
        avatar: '',
        roles: 0,
    },
    mutations: {
        SET_TOKEN: (state, token) => {
            console.log('Vuex Set Token');
            state.token = token
        },
        SET_NAME: (state, name) => {
            state.name = name
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles
        }
    },
    actions: {
        // 登录
        Login({ commit }, userInfo) {
            const username = userInfo.username.trim();
            return new Promise((resolve, reject) => {
                login(username, userInfo.password).then(response => {
                    const data = response.data;
                    console.log(response);
                    setToken(data);
                    commit('SET_TOKEN', data);
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 获取用户信息
        GetInfo({ commit, state }) {
            return new Promise((resolve, reject) => {
                getInfo(state.token).then(response => {
                    const data = response.data;
                    console.log('Vuex GetInfo=>');
                    console.log(response);

                    if (data.role>=0) { // 验证返回的roles是否有效
                        commit('SET_ROLES', data.role.name);

                        console.log(data.role)
                    } else {
                        reject('getInfo: roles must be a non-null array !')
                    }
                    // commit('SET_NAME', data.username);
                    // commit('SET_AVATAR', 'https://ws1.sinaimg.cn/large/5d821655ly1g0t7ygl22hj208e08ctcm.jpg');
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 登出
        LogOut({ commit, state }) {
            return new Promise((resolve, reject) => {
                logout(state.token).then(() => {
                    commit('SET_TOKEN', '');
                    commit('SET_ROLES', 0);
                    removeToken();
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 前端 登出
        FedLogOut({ commit }) {
            return new Promise(resolve => {
                commit('SET_TOKEN', '');
                removeToken();
                resolve()
            })
        }
    }
})

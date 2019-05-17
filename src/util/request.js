import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from '../util/auth'
import Qs from 'qs'

// 创建axios实例
const service = axios.create({
    // baseURL: 'http://172.19.138.203:8080', // api 的 base_url
    baseURL: 'http://upcnia.club:8080', // api 的 base_url
    // baseURL: 'http://172.24.26.12:8080', // api 的 base_url
    // baseURL: 'http://192.168.43.182:8080',
    // baseURL: 'http://180.201.169.185:8080',
    // baseURL: 'http://172.24.191.225:8080',
    timeout: 5000 ,// 请求超时时间
    transformRequest:[function (data) {
        data = Qs.stringify(data);
        return data;
    }]
});
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// request拦截器
service.interceptors.request.use(
    config => {
        console.log('发请求'+getToken());
        if (store.state.token) {
            config.headers.Authorization = getToken() ;// 让每个请求携带token
            config.headers['Content-Type'] = 'application/x-www-form-urlencoded';

            // config.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        } else {
            config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        }
        return config
    },
    error => {
        // Do something with request error
        console.log('Request:' + error) ;// for debug
        Promise.reject(error)
    }
);

// response 拦截器
service.interceptors.response.use(
    response => {
        /**
         * code为非20000是抛错 可结合自己业务进行修改
         */
        const res = response.data;
        console.log('Resp=>');
        console.log(response.data);
        if (res.status !== 0) {
            Message({
                message: res.message,
                type: 'error',
                duration: 5 * 1000
            });

            // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
            if (res.status === 50008 || res.status === 50012 || res.status === 50014) {
                MessageBox.confirm(
                    '你已被登出，可以取消继续留在该页面，或者重新登录',
                    '确定登出',
                    {
                        confirmButtonText: '重新登录',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }
                ).then(() => {
                    store.dispatch('FedLogOut').then(() => {
                        location.reload() // 为了重新实例化vue-router对象 避免bug
                    })
                })
            }
            return Promise.reject('error')
        } else {
            console.log('Resp Return');
            console.log(response.data);
            return response.data
        }
    },
    error => {
        console.log('ResponseError:' + error); // for debug
        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        });
        return Promise.reject(error)
    }
);

export default service

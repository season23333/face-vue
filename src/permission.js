import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message } from 'element-ui'
import { getToken } from './util/auth' // 验权

const whiteList = ['/login','/register'];// 不重定向白名单
router.beforeEach((to, from, next) => {
    NProgress.start();
    if (getToken()) {
        if (to.path === '/login') {
            next({ path: '/index' });
            NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
        } else {
            if (store.state.roles === -1) {
                store.dispatch('GetInfo').then(res => { // 拉取用户信息
                    next()
                }).catch((err) => {
                    store.dispatch('FedLogOut').then(() => {
                        Message.error(err || '验证失败，请重新登录');
                        next({ path: '/login' })
                    })
                })
            } else {
                next()
            }
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            // next(`/login?redirect=${to.path}`) ;// 否则全部重定向到登录页
            next(`/login`) ;// 否则全部重定向到登录页
            NProgress.done()
        }
    }
})

router.afterEach(() => {
    NProgress.done() // 结束Progress
})

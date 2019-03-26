import Vue from 'vue'
import Router from 'vue-router'
import Order from './views/Order.vue'
import Service from './views/Service.vue'
import Index from './views/Index'

import Test from './views/Test'
import Guide from './views/Guides'
import Mocktest from './views/Mocktest'
import Form from './views/Form'
import MyMeeting from './views/MyMeeting'


Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/test',
            name: 'test',
            component: Test,
        },
        {
            path: '/mocktest',
            name: 'mocktest',
            component: Mocktest,

        },
        {
            path: '/service',
            name: 'service',
            component: Service,
            children: [
                {
                    path: '/order',
                    name: 'order',
                    component: Order
                },
                {
                    path: '/index',
                    name: 'index',
                    component: Index
                },
                {
                    path: '/guide',
                    name: 'guide',
                    component: Guide
                },
                {
                    path: '/form',
                    name: 'form',
                    component: Form
                },
                {
                    path: '/mymeeting',
                    name: 'mymeeting',
                    component: MyMeeting
                }
            ]
        }
    ]
})

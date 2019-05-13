// import Vue from 'vue'
// import Router from 'vue-router'
// import Order from './views/Order.vue'
// import Service from './views/Service.vue'
// import Index from './views/Index'
// import Login from './views/Login'
// import Password_reset from './views/Password_reset'
// import Four from './views/404'
// import Five from './views/500'
import Test from './views/Test'
// import Guide from './views/Guides'
// import Mocktest from './views/Mocktest'
// import Form from './views/Form'
// import MyMeeting from './views/MyMeeting'
// import ManageMeeting from './views/ManageMeeting'
// import Notification from './views/Notification'
// import Profile from './views/Profile'
//
//
// Vue.use(Router)
//
// export default new Router({
//     mode: 'history',
//     base: process.env.BASE_URL,
//     routes: [
//         {
//           path: '/login',
//           name: 'login',
//           component: Login,
//         },
//         {
//             path: '/password_reset',
//             name: 'password_reset',
//             component: Password_reset,
//         },
//         // {
//         //     path: '/test',
//         //     name: 'test',
//         //     component: Test,
//         // },
//         {
//             path: '/mocktest',
//             name: 'mocktest',
//             component: Mocktest,
//
//         },
//         {
//             path: '/service',
//             name: 'service',
//             component: Service,
//             children: [
//                 {
//                     path: '/profile',
//                     name: 'profile',
//                     component: Profile
//                 },
//                 {
//                     path: '/notification',
//                     name: 'notification',
//                     component: Notification
//                 },
//                 {
//                     path: '/managemeeting',
//                     name: 'managemeeting',
//                     component: ManageMeeting
//                 },
//                 {
//                     path: '/404',
//                     name: 'four',
//                     component: Four
//                 },
//                 {
//                     path: '/500',
//                     name: 'five',
//                     component: Five
//                 },
//                 {
//                     path: '/order',
//                     name: 'order',
//                     component: Order
//                 },
//                 {
//                     path: '/index',
//                     name: 'index',
//                     component: Index
//                 },
//                 {
//                     path: '/guide',
//                     name: 'guide',
//                     component: Guide
//                 },
//                 {
//                     path: '/form',
//                     name: 'form',
//                     component: Form
//                 },
//                 {
//                     path: '/mymeeting',
//                     name: 'mymeeting',
//                     component: MyMeeting
//                 }
//             ]
//         }
//     ]
// })


// import Vue from 'vue'
// import Router from 'vue-router'
//
// Vue.use(Router)
//
// export default new Router({
//     mode: 'history',
//     base: process.env.BASE_URL,
//     routes: [
//         { path: '/', redirect: '/index' },
//         {
//             path: '/login',
//             name: 'login',
//             component: () => import('@/views/index/index.vue'),
//             component:()=>import(/*webpackChunkName:"name"*/"@/views/home.vue")
//             component(resolve) {
//                 require(['./views/Login'], resolve)
//             }
//         },
//         {
//             path: '/password_reset',
//             name: 'password_reset',
//             // component: Password_reset,
//             component(resolve) {
//                 require(['./views/Password_reset'], resolve)
//             }
//         },
//         {
//             path: '/test',
//             name: 'test',
//             // component: Test,
//             component(resolve) {
//                 require(['./views/Test'], resolve)
//             }
//         },
//         {
//             path: '/mocktest',
//             name: 'mocktest',
//             // component: Mocktest,
//             component(resolve) {
//                 require(['./views/Mocktest'], resolve)
//             }
//         },
//         {
//             path: '/service',
//             name: 'service',
//             // component: Service,
//             component(resolve) {
//                 require(['./views/Service.vue'], resolve)
//             },
//             children: [
//                 {
//                     path: '/profile',
//                     name: 'profile',
//                     component(resolve) {
//                         require(['./views/Profile'], resolve)
//                     }
//                 },
//                 {
//                     path: '/notification',
//                     name: 'notification',
//                     // component: Notification
//                     component(resolve) {
//                         require(['./views/Notification'], resolve)
//                     }
//                 },
//                 {
//                     path: '/managemeeting',
//                     name: 'managemeeting',
//                     // component: ManageMeeting
//                     component(resolve) {
//                         require(['./views/ManageMeeting'], resolve)
//                     }
//                 },
//                 {
//                     path: '/404',
//                     name: 'four',
//                     // component: Four
//                     component(resolve) {
//                         require(['./views/404'], resolve)
//                     }
//                 },
//                 {
//                     path: '/500',
//                     name: 'five',
//                     // component: Five
//                     component(resolve) {
//                         require(['./views/500'], resolve)
//                     }
//                 },
//                 {
//                     path: '/order',
//                     name: 'order',
//                     // component: Order
//                     component(resolve) {
//                         require(['./views/Order.vue'], resolve)
//                     }
//                 },
//                 {
//                     path: '/index',
//                     name: 'index',
//                     // component: Index
//                     component(resolve) {
//                         require(['./views/Index'], resolve)
//                     }
//                 },
//                 {
//                     path: '/guide',
//                     name: 'guide',
//                     // component: Guide
//                     component(resolve) {
//                         require(['./views/Guides'], resolve)
//                     }
//                 },
//                 {
//                     path: '/form',
//                     name: 'form',
//                     // component: Form
//                     component(resolve) {
//                         require(['./views/Form'], resolve)
//                     }
//                 },
//                 {
//                     path: '/mymeeting',
//                     name: 'mymeeting',
//                     // component: MyMeeting
//                     component(resolve) {
//                         require(['./views/MyMeeting'], resolve)
//                     }
//                 }
//             ]
//         }
//     ]
// })


import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        { path: '/', redirect: '/index' },
        {
            path: '/login',
            name: 'login',
            component:()=>import(/*webpackChunkName:"user"*/"./views/Login.vue")
        },
        {
            path: '/password_reset',
            name: 'password_reset',
            component:()=>import(/*webpackChunkName:"user"*/"./views/Password_reset.vue")
        },
        {
            path: '/test',
            name: 'test',
            component: Test,
        },
        {
            path: '/mocktest',
            name: 'mocktest',
            component:()=>import(/*webpackChunkName:"mocktest"*/"./views/Mocktest.vue")
        },
        {
            path: '/service',
            name: 'service',
            component:()=>import(/*webpackChunkName:"service"*/"./views/Service.vue"),
            children: [
                // {
                //     path: '/profile',
                //     name: 'profile',
                //     component:()=>import(/*webpackChunkName:"profile"*/"./views/Profile.vue"),
                // },
                {
                    path: '/notification',
                    name: 'notification',
                    component:()=>import(/*webpackChunkName:"notification"*/"./views/Notification.vue"),
                },
                {
                    path: '/managemeeting',
                    name: 'managemeeting',
                    component:()=>import(/*webpackChunkName:"managemeeting"*/"./views/ManageMeeting.vue"),
                },
                {
                    path: '/404',
                    name: 'four',
                    component:()=>import(/*webpackChunkName:"four"*/"./views/404.vue"),
                },
                {
                    path: '/500',
                    name: 'five',
                    component:()=>import(/*webpackChunkName:"five"*/"./views/500.vue"),
                },
                {
                    path: '/order',
                    name: 'order',
                    component:()=>import(/*webpackChunkName:"order"*/"./views/Order.vue"),
                },
                {
                    path: '/index',
                    name: 'index',
                    component:()=>import(/*webpackChunkName:"index"*/"./views/Index.vue"),
                },
                {
                    path: '/guide',
                    name: 'guide',
                    component:()=>import(/*webpackChunkName:"guides"*/"./views/Guides.vue"),
                },
                {
                    path: '/form',
                    name: 'form',
                    component:()=>import(/*webpackChunkName:"form"*/"./views/Form.vue"),
                },
                {
                    path: '/mymeeting',
                    name: 'mymeeting',
                    component:()=>import(/*webpackChunkName:"mymeeting"*/"./views/MyMeeting.vue"),
                }
            ]
        }
    ]
})

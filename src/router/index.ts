/*
 * @Author: OceanPresent
 * @E-mail: oceanpresent@163.com
 * @Date: 2022-03-15 10:43:12
 */
import About from '@/views/about/About.vue';
import Layout from '@/views/layout/Layout.vue';
import { createWebHashHistory, createRouter } from 'vue-router';

const routes = [
    { path: '/login', component: () => import('@/views/login/Login.vue'), hidden: true },
    { path: '/404', component: () => import('@/views/404.vue'), hidden: true },
    {
        path: '/',
        redirect: '/home',
        component: Layout,
        children: [
            {
                path: 'home',
                name: 'home',
                component: () => import('@/views/home/Home.vue'),
                meta: { title: '首页', icon: '' }
            },
            {
                path: '/about',
                component: About,
                meta: { title: '关于', icon: '' }
            },
        ]
    },
    {
        path: '/activity',
        component: Layout,
        redirect: '/activity/manager',
        name: 'activity',
        meta: { title: '活动', icon: '' },
        children: [
            {
                path: '/activity/manager',
                component: () => import('@/views/activity/ActManager.vue'),
                meta: {
                    title: '活动管理', icon: ''
                }
            },
            {
                path: '/activity/analysis',
                component: () => import('@/views/activity/ActAnalysis.vue'),
                meta: {
                    title: '活动管理', icon: ''
                }
            },
        ]
    },
    { path: '/:pathMatch(.*)*', redirect: '/404', hidden: true }
]

const router = createRouter({
    routes,
    history: createWebHashHistory()
})

export default router;
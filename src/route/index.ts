/*
 * @Author: OceanPresent
 * @E-mail: oceanpresent@163.com
 * @Date: 2022-03-15 10:43:12
 */
import Home from '@/views/Home.vue';
import Manager from '@/views/Activity/Manager.vue';
import About from '@/views/About.vue';
import { createWebHashHistory, createRouter } from 'vue-router';
const routes = [

    {
        path: '/home',
        component: Home,
        meta: { title: '首页', icon: '' }
    },
    {
        path: '/activity',
        component: Manager,
        meta: {
            title: '活动管理', icon: ''
        }
    },
    {
        path: '/about',
        component: About,
        meta: { title: '关于', icon: '' }
    },
    {
        path: '/',
        redirect: '/home'
    }
]

const router = createRouter({
    routes,
    history: createWebHashHistory()
})

export default router;
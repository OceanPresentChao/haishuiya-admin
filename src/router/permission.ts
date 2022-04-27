import { ElMessage } from 'element-plus'
import { getToken } from '@/utils/auth' // 验权
import NProgress from "nprogress"
import 'nprogress/nprogress.css'
const whiteList = ['/login'] // 不重定向白名单
import router from './index';

router.beforeEach((to, from, next) => {
    NProgress.start()
    if (getToken()) {
        if (to.path === '/login') {
            next({ path: '/' })
            NProgress.done()
        } else {
            next()
            NProgress.done()
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            next('/login')
            NProgress.done()
        }
    }
})

router.afterEach(() => {
    NProgress.done()
})
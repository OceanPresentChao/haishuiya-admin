import { defineStore } from 'pinia'
import type { RouteRecordRaw } from 'vue-router'
import { Types } from './type'
import Layout from '@/layout/index.vue'
import { menuRoutes } from '@/router';

const modules = import.meta.glob('../views/**/*.vue')

export const useMenuStore = defineStore({
    id: Types.MENU,
    state: () => {
        return {
            count: 0,
            collapse: false,
            menuList: menuRoutes
        }
    },
    getters: {
    },
    actions: {
        setCount(count: number) {
            this.count = count
        },
        setCollapse(collapse: boolean) {
            this.collapse = collapse
        },
        setMenuList(routes: Array<RouteRecordRaw>) {
            this.menuList = this.menuList.concat(routes)
        },
        // getMenuListActions(router: any) {
        //     return new Promise((resolve, reject) => {
        //         //存的是有权限的路由，是一个数组
        //         getMenuListApi().then(res => {
        //             let accessedRoutes: RouteRecordRaw[] = [];
        //             if (res.code == 200) {
        //                 // console.log('res.data',res.data)
        //                 accessedRoutes = filterAsyncRoutes(res.data, router)
        //             }
        //             this.setMenuList(accessedRoutes)
        //             resolve(accessedRoutes)
        //         }).catch(error => {
        //             reject(error)
        //         })
        //     })
        // }
    }
})

export function filterAsyncRoutes(routes: RouteRecordRaw[], router: any) {
    const res: Array<RouteRecordRaw> = []
    //循环每一个路由
    routes.forEach((route: any) => {
        const tmp = { ...route }
        const component = tmp.component;
        if (route.component) {
            if (component == 'Layout') {
                tmp.component = Layout;
            } else {
                // console.log(component)
                tmp.component = modules[`../views${component}.vue`]
            }
        }
        //判断是否有下级
        if (tmp.children) {
            tmp.children = filterAsyncRoutes(tmp.children, router)
        }
        // console.log(tmp)
        router.addRoute(tmp)
        res.push(tmp)
    })
    console.log(res)
    return res
}
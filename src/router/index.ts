import { useAuthStore } from '@/store/auth';
import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router';
import Layout from "@/layout/index.vue"
import Login from "@/views/login/Login.vue"
import Home from "@/views/home/Home.vue"
import NProgress from "nprogress";
// const { t } = useI18n()
export const menuRoutes: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        meta: {
            title: "首页",
            icon: "carbon:home",
            roles: ["sys:manage"]
        },
        children: [
            {
                path: '/dashboard',
                component: Home,
            },
        ]
    },
    {
        path: "/product",
        component: Layout,
        name: "product",
        meta: {
            title: "活动管理",
            icon: "carbon:product",
            roles: ["sys:goods"],
            parentId: 0,
        },
        children: [
            {
                path: "/product/activity",
                component: () => import("@/views/product/book/BookList.vue"),
                name: "activity",
                meta: {
                    title: "活动列表",
                    icon: "akar-icons:book",
                    roles: ["sys:goodsCategory"],
                    parentId: 34,
                }
            },
            {
                path: "/product/updateActivity",
                component: () => import("@/views/product/book/BookDetail.vue"),
                name: "updateActivity",
                props: {
                    isEdit: true
                },
                meta: {
                    title: "更新活动",
                    icon: "carbon:word-cloud",
                    roles: ["sys:goodsCategory"],
                    hidden: true
                },
            },
            {
                path: "/product/createActivity",
                component: () => import("@/views/product/book/BookDetail.vue"),
                name: "createActivity",
                props: {
                    isEdit: false
                },
                meta: {
                    title: "创建活动",
                    icon: "bxs:book-add",
                    roles: ["sys:goodsCategory"],
                },
            },
        ],
    },
    {
        path: "/company",
        component: Layout,
        name: "company",
        meta: {
            title: "社团管理",
            icon: "carbon:id-management",
            roles: ["sys:goods"],
            parentId: 0,
        },
        children: [
            {
                path: "/company/staff",
                component: () => import("@/views/company/StaffList.vue"),
                name: "staff",
                meta: {
                    title: "成员管理",
                    icon: "ic:baseline-manage-accounts",
                    roles: ["sys:goodsCategory"],
                    parentId: 34,
                },
            },
        ],
    },
    {
        path: '/replayground',
        component: Layout,
        redirect: '/playground',
        meta: {
            title: "广场",
            icon: "arcticons:google-play-console",
            roles: ["sys:manage"]
        },
        children: [
            {
                path: '/playground',
                component: () => import("@/views/playground/Playground.vue"),
            },
        ]
    },
    {
        path: '/reabout',
        component: Layout,
        redirect: '/about',
        meta: {
            title: "关于",
            icon: "akar-icons:info",
            roles: ["sys:manage"]
        },
        children: [
            {
                path: '/about',
                component: () => import("@/views/about/About.vue"),
            },
        ]
    },

]

const constantRoutes: Array<RouteRecordRaw> = [

    {
        path: '/login',
        name: 'login',
        component: Login,
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import("@/views/error/404.vue"),
    }
]

export const router = createRouter({
    routes: [...menuRoutes, ...constantRoutes],
    history: createWebHashHistory()
})
const whiteList = ["/login"];

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()
    NProgress.start()
    if (authStore.getToken()) { // 判断是否有token
        if (to.path === '/login') {
            next({ path: '/' });
        } else {
            if (authStore.userInfo.roles.length === 0) { // 判断当前用户是否已拉取完
                authStore.getAdminInfo()
                next({ ...to, replace: true })
            } else {
                next() //当有用户权限的时候，说明所有可访问路由已生成 如访问没权限的全面会自动进入404页面
            }
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
            next();
        } else {
            next('/login'); // 否则全部重定向到登录页
        }
    }
})

router.afterEach(() => {
    NProgress.done();
})
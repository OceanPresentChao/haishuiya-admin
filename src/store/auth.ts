import Cookies from 'js-cookie'
import { defineStore } from 'pinia'
import { useTabsStore } from './tabs';
import { Types } from './type'

interface UserInfo {
    name: string
    roles: string[]
    [propName: string]: any
}

const emptyInfo: UserInfo = {
    name: 'OceanPresent',
    roles: ['admin'],
    avatar: 'http://q1.qlogo.cn/g?b=qq&nk=1255342403&s=640'
}

export const useAuthStore = defineStore({
    id: Types.AUTH,
    state: () => {
        // 登陆显示组件判断 0：登陆 1：忘记密码，默认0：登陆
        return {
            TokenKey: 'Login',
            currentPage: 0,
            userInfo: emptyInfo
        }
    },
    getters: {

    },
    actions: {
        getToken() {
            return Cookies.get(this.TokenKey)
        },
        setToken(token: string) {
            Cookies.set(this.TokenKey, token)
            useSessionStorage(this.TokenKey, token)
        },
        removeToken() {
            Cookies.remove(this.TokenKey)
            useSessionStorage(this.TokenKey, undefined)
        },
        getAdminInfo() {
            this.userInfo.roles = ['admin']
            return {
                role: ['admin']
            }
        },
        setCurrentPage(page: 0 | 1) {
            this.currentPage = page
        },
        loginByAdminName(adminForm: Object) {
            console.log("@@@", adminForm);
            this.setToken("eyJhbGciOiJIUzUxMiJ9.test")
        },
        logOut() {
            const router = useRouter()
            const tabsStore = useTabsStore()
            this.userInfo = emptyInfo
            this.removeToken()
            tabsStore.clearTabs()

        },
    }
})



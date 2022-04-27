import { defineStore, acceptHMRUpdate } from 'pinia';
import adminapi from '@/api/Admin';
import { getToken, setToken, removeToken } from '@/utils/auth';
export const useAdminStore = defineStore('admin', {
    state: () => {
        return {
            token: "getToken()",
            username: ''
        }
    },
    actions: {
        async login(info: AdminInfo) {
            let result = await adminapi.requestLogin(info)
            console.log("@@@", result);
        }
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useAdminStore, import.meta.hot))
}
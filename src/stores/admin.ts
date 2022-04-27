import { defineStore, acceptHMRUpdate } from 'pinia';
import adminapi from '@/api/Admin';
import { getToken, setToken, removeToken } from '@/utils/auth';
export const useAdminStore = defineStore('admin', {
    state: () => {
        return {
            token: getToken(),
            username: ''
        }
    },
    actions: {
        login(info: AdminInfo) {
            return new Promise(async (resolve, reject) => {
                const result = await adminapi.requestLogin(info)
                console.log("@@@", result);
                const data = result.data
                setToken(data.token)
                resolve(true)
            });
        }
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useAdminStore, import.meta.hot))
}
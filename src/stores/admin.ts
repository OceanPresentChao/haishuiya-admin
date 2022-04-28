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
                try {
                    const result = await adminapi.requestLogin(info)
                    if (result) {
                        const data = result.data
                        setToken(data.token)
                    }
                    resolve(true)
                } catch (error) {
                    reject(error)
                }

            });
        }
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useAdminStore, import.meta.hot))
}
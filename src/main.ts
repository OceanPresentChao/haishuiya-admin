import App from './App.vue'
import router from './router';
import { createPinia } from "pinia"
import API from './api';
import '@/router/permission';
const app = createApp(App);
const pinia = createPinia()
declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $API: typeof API
    }
}
app.config.globalProperties.$API = API
app.use(router)
app.use(pinia)
app.mount('#app')

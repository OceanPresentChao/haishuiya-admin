import App from './App.vue'
import router from './router';
import { createPinia } from "pinia"
import API from './api';
const app = createApp(App);
declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $API: typeof API
    }
}
app.config.globalProperties.$API = API
app.use(router)
app.use(createPinia())
app.mount('#app')

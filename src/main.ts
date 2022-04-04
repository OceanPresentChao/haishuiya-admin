import App from './App.vue'
import router from './route';
import API from './api';

const app = createApp(App);
declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $API: typeof API;
    }
}
app.config.globalProperties.$API = API;
app.use(router);
app.mount('#app')

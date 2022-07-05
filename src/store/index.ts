import { createPinia } from 'pinia';
import { router } from '@/router';
import piniaPluginPersist from 'pinia-plugin-persist'

const pinia = createPinia()
pinia.use(piniaPluginPersist)
pinia.use(({ store }) => {
    store.$router = markRaw(router)
});
export { pinia }
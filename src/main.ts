import { createApp, type Directive } from 'vue'
import { store } from '@/store/index';
import { router } from '@/router';
import { Icon } from '@iconify/vue';
import { i18n } from "@/locales"
import * as directives from "@/directives";
import App from './App.vue'

import './style/transition.css'
import './style/manage.css'
import './style/index.css'
import './style/element.css'
import './index.css'
const app = createApp(App)
app.component("Icon", Icon)
app.use(i18n).use(router).use(store)
Object.keys(directives).forEach(key => {
    app.directive(key, (directives as { [key: string]: Directive })[key]);
})
app.mount('#app')

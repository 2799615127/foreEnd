import {createApp} from 'vue'
// import './style.css'
import App from './App.vue'
import router from "./router/router.js";
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import {aliases, mdi} from "vuetify/iconsets/mdi";
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
//vue-quill
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import axios from './assets/axios/axiosInstance.js'

//配置vuetify
const vuetify = createVuetify({
    components,
    directives,
    ssr: true,
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi,
        }
    }
})
// 5. 创建并挂载根实例
const app = createApp(App)
//确保 _use_ 路由实例使
//整个应用支持路由。
app.use(router)
//注册富文本编译器
app.component('QuillEditor',QuillEditor);
//vuetify界面框架
app.use(vuetify);
app.mount('#app')
app.config.globalProperties.$axios=axios;
window.router=router
// createApp(App).mount('#app')



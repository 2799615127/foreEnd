import { createApp, render, getCurrentInstance } from 'vue'
// import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
const vuetify = createVuetify({
    ssr: true,
})
export default createVuetify({
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi,
        }
    },
})
createApp(vuetify);
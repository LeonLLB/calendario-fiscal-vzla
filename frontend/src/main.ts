import {createApp} from 'vue'
import App from './App.vue'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import {createRouter, createWebHashHistory} from 'vue-router'
import routes from './routes'

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

const vuetify = createVuetify({
    components,
    directives,
})

createApp(App).use(router).use(vuetify).mount('#app')

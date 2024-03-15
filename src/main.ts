import { createApp } from 'vue'
import router from '@/router/index'
import '@/static/styles/static-vars.scss'
import App from './App.vue'
import './global.css'

const app = createApp(App)
app.use(router)
app.mount('#app')

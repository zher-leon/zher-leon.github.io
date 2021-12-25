// @ts-nocheck
import { createApp } from 'vue'
import App from './App.vue'
// import router from './router/index'
import { installPlugins } from '@utils/installer.js'

let app = createApp(App)

installPlugins(app).then(() => {
  // app.use(router)
  app.mount('#app')
})

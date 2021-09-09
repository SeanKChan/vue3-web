
import { createApp, Directive } from 'vue'
import App from './App.vue'
// import './pwa/registerServiceWorker'
import router from './router'
import { store } from './store'
import { loadAllPlugins } from './plugins'
import '@/styles/index.scss'
import 'normalize.css'
import * as directives from '@/directives'
// import '@/permission'

const app = createApp(App)
// 1. 加载所有插件
loadAllPlugins(app)
// 2. 加载自定义指令
Object.keys(directives).forEach(key => {
  app.directive(key, (directives as { [key: string]: Directive })[key])
})

app.use(store)
  .use(router)
  .mount('#app')

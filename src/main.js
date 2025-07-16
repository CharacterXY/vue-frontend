import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import vuetify from './plugins/vuetify' 
import { ro } from 'vuetify/locale'

createApp(App)
  .use(vuetify)
  .use(router)
  .mount('#app')




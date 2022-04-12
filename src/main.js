import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'fork-awesome/css/fork-awesome.min.css'

const app = createApp(App);

app.use(router);

app.mount('#app');

import './assets/main.css'
import 'primeicons/primeicons.css'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

import { createApp } from 'vue'
import App from './App.vue'
import Router from '@/Router'
createApp(App).use(Router).use(Toast).mount('#app')

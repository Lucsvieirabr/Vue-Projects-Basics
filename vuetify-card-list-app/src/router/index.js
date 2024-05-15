import { createWebHistory, createRouter } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'

const routes = [
  { path: '/', component: LoginView, name: 'login' },
  { path: '/home', component: HomeView, name: 'home' },
]

const router = createRouter({
   history: createWebHistory(),
  routes,
})

export default router
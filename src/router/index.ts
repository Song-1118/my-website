import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Download from '../views/Download.vue'
import Web from '../views/Web.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/download',
    name: 'Download',
    component: Download
  },
  {
    path: '/web',
    name: 'Web',
    component: Web

  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
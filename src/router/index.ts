import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Download from '../views/Download.vue'
import Web from '../views/Web.vue'
import Error404 from "../views/Error404.vue";

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

  },
  {
    // 404界面捕捉跳转
    path: '/:pathMatch(.*)*',
    name: '404',
    component: Error404

  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
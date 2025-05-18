import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Download from "../views/Download.vue";
import Web from "../views/Web.vue";
import Error404 from "../views/Error404.vue";
import Music from "../views/Music/Music.vue";
import Default from "../views/Music/Default.vue";
import Antiquities from "../views/Music/Antiquities.vue";
import Player from "../views/Music/Player.vue";
import Player2 from "../views/Music/Player2.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/download",
    name: "Download",
    component: Download,
  },
  {
    path: "/web",
    name: "Web",
    component: Web,
  },
  {
    path: "/music",
    name: "Music",
    component: Music,
  },
  {
    path: "/music/default",
    name: "Default",
    component: Default,
  },
  {
    path: '/music/antiquities',
    name: "Antiquities",
    component: Antiquities
  },
  {
    path: "/player",
    name: "Player",
    component: Player
  },
  {
    path: "/player2",
    name: "Player2",
    component: Player2,
  },
  {
    // 404界面捕捉跳转
    path: "/:pathMatch(.*)*",
    name: "404",
    component: Error404,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

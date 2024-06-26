import { createRouter, createWebHistory } from "vue-router";

var routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/tfa",
    name: "TFA",
    component: () => import("../views/Tfa.vue"),
  },
  ,
  {
    path: "/lobby",
    name: "Lobby",
    component: () => import("../views/Lobby.vue"),
  },
  {
    path: "/pong",
    name: "Pong",
    component: () => import("../views/Pong.vue"),
  },
  {
    path: "/profile/:id",
    name: "FriendProfile",
    component: () => import("../views/Profile.vue"),
  },
  {
	path: '/profile',
	name: 'Profile',
	component: () => import('../views/Profile.vue')
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

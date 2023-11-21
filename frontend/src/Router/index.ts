import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/views/Login.vue';

var routes = [
	{
		path: '/',
		name: 'Login',
		component: Login
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes
});

export default router

import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../views/LoginPage.vue';
import RegisterPage from '../views/RegisterPage.vue';
import WikiPage from '../views/WikiPage.vue';
import PlayPage from '../views/PlayPage.vue';
import StatsPage from '../views/StatsPage.vue';

const routes = [
    { path: '/login', name: 'Login', component: LoginPage },
    { path: '/register', name: 'Register', component: RegisterPage },
    { path: '/wiki', name: 'Wiki', component: WikiPage },
    { path: '/play', name: 'Play', component: PlayPage },
    { path: '/stats', name: 'Stats', component: StatsPage },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;

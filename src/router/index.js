import { createRouter, createWebHistory } from 'vue-router';
import LoginForm from '../components/LoginForm.vue';
import RegisterForm from '../components/RegisterForm.vue';
import GamePage from '../components/GamePage.vue';
import StatsPage from '../components/StatsPage.vue';
import WikiPage from '@/components/WikiPage.vue';

const routes = [
    {
        path: '/',
        name: 'home',
        redirect: '/wiki', // O la vista que consideres como inicio
    },
    {
        path: '/login',
        name: 'login',
        component: LoginForm, // Componente de login
    },
    {
        path: '/register',
        name: 'register',
        component: RegisterForm, // Componente de registro
    },
    {
        path: '/wiki',
        name: 'wiki',
        component: WikiPage, // Componente de Wikipedia
    },
    {
        path: '/stats',
        name: 'stats',
        component: StatsPage, // Componente de estadísticas
        meta: { requiresAuth: true }, // Solo accesible si el usuario está logeado
    },
    {
        path: '/game',
        name: 'game',
        component: GamePage, // Componente de juego
        meta: { requiresAuth: true }, // Solo accesible si el usuario está logeado
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token');

    if (to.meta.requiresAuth && !token) {
        // Si el componente requiere autenticación pero el usuario no está logeado, redirigir al login
        next({ name: 'login' });
    } else {
        next();
    }
});

export default router;

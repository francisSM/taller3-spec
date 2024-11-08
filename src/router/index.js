import { createRouter, createWebHistory } from 'vue-router';
import Navbar from '../components/Navbar.vue';
import LoginForm from '../components/LoginForm.vue';
import RegisterForm from '../components/RegisterForm.vue';
import GamePage from '../components/GamePage.vue';
import StatsPage from '../components/StatsPage.vue';

const routes = [
    {
        path: '/',
        name: 'home',
        component: Navbar, // Página principal con Navbar
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

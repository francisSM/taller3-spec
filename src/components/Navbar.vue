<template>
    <nav>
        <ul>
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/login" v-if="!isAuthenticated">Login</router-link></li>
            <li><router-link to="/register" v-if="!isAuthenticated">Register</router-link></li>
            <li><router-link to="/stats" v-if="isAuthenticated">Stats</router-link></li>
            <li><router-link to="/game" v-if="isAuthenticated">Game</router-link></li>
            <li v-if="isAuthenticated">
                <button @click="logout">Logout</button>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
    name: 'NavBarComponent',
    data() {
        return {
            isAuthenticated: false,
        };
    },
    created() {
        this.checkAuth();
    },
    methods: {
        checkAuth() {
            const token = localStorage.getItem('token');
            if (token) {
                this.isAuthenticated = true;
            }
        },
        logout() {
            localStorage.removeItem('token');
            this.isAuthenticated = false;
            this.$router.push('/login');
        },
    },
};
</script>

<style scoped>
/* Estilos básicos para la barra de navegación */
nav {
    background-color: #333;
    padding: 10px;
}

ul {
    list-style: none;
    padding: 0;
}

li {
    display: inline;
    margin-right: 10px;
}

a {
    color: white;
    text-decoration: none;
}

button {
    color: white;
    background: none;
    border: 1px solid white;
    cursor: pointer;
}
</style>
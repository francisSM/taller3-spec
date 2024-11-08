<template>
    <div>
        <nav class="navbar">
            <div class="navbar-logo">
                <h1>Game Wiki</h1>
            </div>
            <div class="navbar-links">
                <router-link to="/" class="navbar-link" :class="{ active: $route.name === 'home' }">Home</router-link>
                <router-link to="/wiki" class="navbar-link"
                    :class="{ active: $route.name === 'wiki' }">Wiki</router-link>
                <router-link to="/stats" class="navbar-link"
                    :class="{ active: $route.name === 'stats' }">Estadísticas</router-link>
                <router-link v-if="!isAuthenticated" to="/login" class="navbar-link"
                    :class="{ active: $route.name === 'login' }">Login</router-link>
                <router-link v-if="!isAuthenticated" to="/register" class="navbar-link"
                    :class="{ active: $route.name === 'register' }">Register</router-link>
                <router-link v-if="isAuthenticated" to="/game" class="navbar-link"
                    :class="{ active: $route.name === 'game' }">Play</router-link>
                <button v-if="isAuthenticated" class="logout-btn" @click="logout">Logout</button>
            </div>
        </nav>
    </div>
</template>

<script>
export default {
    name: 'NavbarComponent',
    data() {
        return {
            isAuthenticated: false,
        };
    },
    created() {
        this.checkAuthentication();
    },
    methods: {
        checkAuthentication() {
            const token = localStorage.getItem('token');
            this.isAuthenticated = !!token;
        },
        logout() {
            localStorage.removeItem('token');
            this.isAuthenticated = false;
            this.$router.push('/login');
        },
    },
    watch: {
        '$route'() {
            this.checkAuthentication();
        },
    },
};
</script>

<style scoped>
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #2c3e50;
    padding: 15px 30px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.navbar-logo h1 {
    color: white;
    font-size: 24px;
    font-weight: bold;
}

.navbar-links {
    display: flex;
    align-items: center;
}

.navbar-link {
    color: #ecf0f1;
    text-decoration: none;
    font-size: 18px;
    margin: 0 15px;
    transition: color 0.3s;
}

.navbar-link:hover {
    color: #3498db;
}

.logout-btn {
    background-color: #e74c3c;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.logout-btn:hover {
    background-color: #c0392b;
}

.navbar-link.active {
    color: #3498db;
}
</style>
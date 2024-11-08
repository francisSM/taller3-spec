<template>
    <div>
        <h2>Login</h2>
        <form @submit.prevent="login">
            <input type="text" v-model="username" placeholder="Username" required />
            <input type="password" v-model="password" placeholder="Password" required />
            <button type="submit">Login</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'LoginForm',
    data() {
        return {
            username: '',
            password: '',
        };
    },
    methods: {
        async login() {
            try {
                const response = await axios.post('http://localhost:5000/api/login', {
                    username: this.username,
                    password: this.password,
                });
                localStorage.setItem('token', response.data.token); // Guardamos el token
                this.$router.push('/wiki'); 
                this.$root.$forceUpdate(); // Fuerza la actualización global

            } catch (error) {
                alert('Credenciales Invalidas');
            }
        },
    },
};
</script>

<style scoped>
/* Estilos básicos para el formulario de login */
form {
    max-width: 300px;
    margin: 0 auto;
}

input {
    width: 100%;
    padding: 10px;
    margin: 10px 0;
}

button {
    width: 100%;
    padding: 10px;
    background-color: #333;
    color: white;
}
</style>
<template>
    <div>
        <h2>Register</h2>
        <form @submit.prevent="register">
            <input type="text" v-model="username" placeholder="Username" required />
            <input type="password" v-model="password" placeholder="Password" required />
            <button type="submit">Register</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'RegisterForm',
    data() {
        return {
            username: '',
            password: '',
        };
    },
    methods: {
        async register() {
            try {
                const response = await axios.post('http://localhost:5000/api/register', {
                    username: this.username,
                    password: this.password,
                });
                alert(response.data.message);
                this.$router.push('/login'); // Redirige al login después de registrarse
            } catch (error) {
                alert('Error during registration');
            }
        },
    },
};
</script>

<style scoped>
/* Estilos básicos para el formulario de registro */
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
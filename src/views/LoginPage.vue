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
    name: 'LoginPage',
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
                alert(response.data.message); // Mensaje temporal
                } catch (error) {
                    alert('Error de inicio de sesión');
                }
            },
        },
        };
</script>

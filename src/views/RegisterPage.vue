<template>
    <div>
        <h2>Registro</h2>
        <form @submit.prevent="register">
            <input type="text" v-model="username" placeholder="Nombre de usuario" required />
            <input type="password" v-model="password" placeholder="Contraseña" required />
            <button type="submit">Registrar</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'RegisterPage',
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
                this.$router.push('/login'); 
            } catch (error) {
                alert('Error en el registro');
            }
        },
    },
};
</script>

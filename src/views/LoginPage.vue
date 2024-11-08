<!-- src/views/LoginPage.vue -->
<template>
    <div>
        <h2>Iniciar sesión</h2>
        <form @submit.prevent="login">
            <input type="text" v-model="username" placeholder="Nombre de usuario" required />
            <input type="password" v-model="password" placeholder="Contraseña" required />
            <button type="submit">Iniciar sesión</button>
        </form>
        <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
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
            errorMessage: '', // Para mostrar los errores
        };
    },
    methods: {
        async login() {
            try {
                // Enviar los datos de login al backend
                const response = await axios.post('http://localhost:5000/api/login', {
                    username: this.username,
                    password: this.password,
                });

                // Si la respuesta es exitosa, guardamos el token en localStorage
                const token = response.data.token;
                localStorage.setItem('token', token); // Guardamos el token

                // Redirigimos al usuario a la página principal (o a donde sea necesario)
                this.$router.push('/wiki'); // O cualquier ruta que desees redirigir tras login
            } catch (error) {
                // Si ocurre un error (ej. usuario o contraseña incorrectos)
                this.errorMessage = 'Usuario o contraseña incorrectos. Intenta de nuevo.';
            }
        },
    },
};
</script>

<style scoped>
/* Estilos para la página de login */
form {
    max-width: 300px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

input {
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 5px;
}

button {
    width: 100%;
    padding: 10px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 5px;
}

button:hover {
    background-color: #45a049;
}
</style>
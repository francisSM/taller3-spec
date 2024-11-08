<!-- src/components/GamePage.vue -->
<template>
    <div>
        <h2>Game</h2>
        <p>Start playing the game here...</p>
        <p v-if="!isAuthenticated">Please log in to play the game.</p>
    </div>
</template>

<script>
export default {
    name: 'GamePage',
    data() {
        return {
            isAuthenticated: false,
        };
    },
    created() {
        const token = localStorage.getItem('token');
        if (token) {
            this.isAuthenticated = true;
        }
    },
};
</script>

<style scoped>
/* Estilos para el componente del juego */
h2 {
    text-align: center;
}
</style>
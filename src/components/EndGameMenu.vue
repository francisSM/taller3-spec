<!-- src/components/EndGameMenu.vue -->
<template>
  <div v-if="isVisible" class="end-game-menu">
    <h2>¡Juego Terminado!</h2><br><br>
    <button @click="onPlayAgain">Jugar de nuevo</button>
    <button @click="onBackToMenu">Volver al Menú</button>
  </div>
</template>

<script>
export default {
  props: {
    // 'show' prop para controlar la visibilidad del componente
    show: {
      type: Boolean,
      required: true,
    }
  },
  computed: {
    // Computed property para manejar la visibilidad
    isVisible() {
      return this.show;
    }
  },
  methods: {
    onPlayAgain() {
      this.$emit('play-again');
    },
    onBackToMenu() {
      this.$emit('back-to-menu');
    },
  },
};
</script>

<style scoped>
.end-game-menu {
  justify-content: center; /* Centra horizontalmente */
  align-items: center;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 250px;
  height: 100vh;  
}

button {
  background-color: #111;
    color: #00ffcc;
    padding: 10px 20px;
    margin: 10px;
    font-size: 16px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 8px;
    cursor: pointer;
    box-shadow: 0px 0px 15px rgba(0, 255, 204, 0.6), 
                inset 0px 0px 10px rgba(0, 255, 204, 0.8);
    transition: transform 0.2s ease, box-shadow 0.3s ease;
}

button:hover {
  background-color: #2980b9;
}
</style>
